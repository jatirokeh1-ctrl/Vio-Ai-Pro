async function prosesScreenshot() {
    const fileInput = document.getElementById("screenshot-input");
    const promptInput = document.getElementById("ai-prompt");
    const canvas = document.getElementById("content-canvas");
    const btn = document.getElementById("btn-generate");

    if (!fileInput.files[0]) return alert("Pilih file gambar dulu!");

    btn.innerText = "Menganalisis Gambar...";
    btn.disabled = true;

    // Konversi gambar ke Base64
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = async () => {
        const base64Image = reader.result;

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    pesan: promptInput.value || "Ubah screenshot ini menjadi kode HTML dan CSS yang persis.",
                    gambar: base64Image 
                })
            });
            
            const data = await response.json();
            const hasilKode = data.choices[0].message.content;

            // Tampilkan hasil (AI biasanya memberikan markdown ```html ... ```)
            canvas.innerText = hasilKode; 
            alert("Berhasil! Kode dihasilkan di bawah.");
        } catch (error) {
            alert("Terjadi kesalahan.");
        } finally {
            btn.innerText = "Convert ke Kode";
            btn.disabled = false;
        }
    };
}
