import { useCallback, useState } from "react";

interface EnquiryModalState {
  isOpen: boolean;
  prefill: string;
}

export function useEnquiryModal() {
  const [state, setState] = useState<EnquiryModalState>({
    isOpen: false,
    prefill: "",
  });

  const openModal = useCallback((prefill = "") => {
    setState({ isOpen: true, prefill });
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    isOpen: state.isOpen,
    prefill: state.prefill,
    openModal,
    closeModal,
  };
}
