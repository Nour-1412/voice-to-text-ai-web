async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("اختر ملف أولاً");
    return;
  }

  document.getElementById("status").innerText = "⏳ جاري التحويل...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "whisper-1");

  try {
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: formData
    });

    const data = await response.json();

    document.getElementById("status").innerText = "✅ تم التحويل";
    document.getElementById("result").innerText = data.text;

  } catch (error) {
    document.getElementById("status").innerText = "❌ حدث خطأ";
    console.error(error);
  }
}
