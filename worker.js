export default {
  async fetch(req, env) {

    if (req.method !== "POST") {
      return new Response("POST only");
    }

    const form = await req.formData();
    const file = form.get("file");

    const hf = await fetch(
      "https://api-inference.huggingface.co/models/openai/whisper-small",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_HF_TOKEN"
        },
        body: file
      }
    );

    const result = await hf.json();

    return new Response(JSON.stringify({
      text: result.text || "لم يتم التعرف"
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
