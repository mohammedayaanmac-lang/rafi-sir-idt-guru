import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { AdminButton } from "./components/AdminButton";
import { AdminPasswordModal } from "./components/AdminPasswordModal";
import { EnquiryModal } from "./components/EnquiryModal";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/sections/AboutSection";
import { AchievementsSection } from "./components/sections/AchievementsSection";
import { BooksSection } from "./components/sections/BooksSection";
import { ContactSection } from "./components/sections/ContactSection";
import { CoursesSection } from "./components/sections/CoursesSection";
import { FAQSection } from "./components/sections/FAQSection";
import { HeroSection } from "./components/sections/HeroSection";
import { HighlightsBar } from "./components/sections/HighlightsBar";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { AdminPage } from "./pages/AdminPage";

// Shared auth state — passed through context
let globalIsAdminAuth = false;
const authListeners: Array<(v: boolean) => void> = [];

function setGlobalAuth(v: boolean) {
  globalIsAdminAuth = v;
  for (const fn of authListeners) fn(v);
}

function useGlobalAuth() {
  const [isAuth, setIsAuth] = useState(globalIsAdminAuth);
  if (!authListeners.includes(setIsAuth)) authListeners.push(setIsAuth);
  return { isAuth, setAuth: setGlobalAuth };
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Home page component
function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefill, setPrefill] = useState("");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const { isAuth, setAuth } = useGlobalAuth();
  const navigate = useNavigate();

  const openEnquiry = (course = "") => {
    setPrefill(course);
    setModalOpen(true);
  };

  const handleAdminSuccess = () => {
    setAuth(true);
    setAdminModalOpen(false);
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onEnquireClick={() => openEnquiry()} />
      <main>
        <HeroSection onEnquireClick={() => openEnquiry()} />
        <HighlightsBar />
        <AboutSection />
        <CoursesSection onEnquireClick={openEnquiry} />
        <BooksSection onEnquireClick={openEnquiry} />
        <AchievementsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection onEnquireClick={() => openEnquiry()} />
      </main>
      <Footer />
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={prefill}
      />
      {!isAuth && (
        <>
          <AdminButton onClick={() => setAdminModalOpen(true)} />
          <AdminPasswordModal
            isOpen={adminModalOpen}
            onClose={() => setAdminModalOpen(false)}
            onSuccess={handleAdminSuccess}
          />
        </>
      )}
    </div>
  );
}

// Admin route wrapper — guards against unauthenticated access
function AdminRoute() {
  const { isAuth, setAuth } = useGlobalAuth();
  const navigate = useNavigate();
  const [adminModalOpen, setAdminModalOpen] = useState(!isAuth);

  const handleSuccess = () => {
    setAuth(true);
    setAdminModalOpen(false);
  };

  if (!isAuth) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground font-body">
            Authentication required…
          </p>
        </div>
        <AdminPasswordModal
          isOpen={adminModalOpen}
          onClose={() => {
            setAdminModalOpen(false);
            navigate({ to: "/" });
          }}
          onSuccess={handleSuccess}
        />
      </>
    );
  }

  const handleLogout = () => {
    setAuth(false);
    navigate({ to: "/" });
  };

  return <AdminPage onLogout={handleLogout} />;
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminRoute,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
