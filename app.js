let usage = 5;

async function uploadFile() {
  if (usage <= 0) {
    alert("انتهى الاستخدام المجاني");
    return;
  }

  const file = document.getElementById("fileInput").files[0];

  if (!file) return;

  document.getElementById("status").innerText = "⏳ جاري التحليل...";

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://YOUR_WORKER_URL/transcribe", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  document.getElementById("result").innerText = data.text;
  document.getElementById("status").innerText = "✅ تم";

  usage--;
  document.getElementById("limit").innerText = usage;
}

function copyText() {
  navigator.clipboard.writeText(document.getElementById("result").innerText);
  alert("تم النسخ");
}
