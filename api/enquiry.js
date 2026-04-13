export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    return res.status(200).json({
      message: "Enquiry received",
      data: data,
    });
  }

  res.status(405).json({ message: "Only POST allowed" });
}
