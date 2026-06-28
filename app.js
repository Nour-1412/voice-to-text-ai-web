let recognition;

function startRecording() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("المتصفح لا يدعم الميزة");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ar-SA"; // العربية
  recognition.continuous = true;

  recognition.onresult = function(event) {
    let text = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript + " ";
    }

    document.getElementById("output").innerText = text;
  };

  recognition.start();
}

function stopRecording() {
  if (recognition) {
    recognition.stop();
  }
}
