export default async function handler(req, res) {
  const { pesan, gambar } = req.body; // Menerima teks dan base64 gambar

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: pesan },
          { type: "image_url", image_url: { url: gambar } }
        ],
      },
    ],
    max_tokens: 2000
  };

  try {
    const response = await fetch("https://openai.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses gambar" });
  }
}
