const baseURL = process.env.NEXT_PUBLIC_TEX_API_URL;

export async function fetchFromTex(prompt) {
  try {
    const res = await fetch(`${baseURL}/reason`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      console.error("Tex backend returned error:", res.statusText);
      throw new Error("Tex backend error");
    }

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("Failed to fetch from Tex:", error);
    return "⚠️ Tex is currently offline or unreachable.";
  }
}
