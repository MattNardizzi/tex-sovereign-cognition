const baseURL = process.env.NEXT_PUBLIC_TEX_API_URL || "http://localhost:8000";

/**
 * Sends a prompt to Tex's `/think` API and returns the response.
 * @param {string} prompt - The prompt to send to Tex
 * @returns {Promise<string>} - Tex's reflected response
 */
export async function fetchFromTex(prompt) {
  try {
    const res = await fetch(`${baseURL}/think`, {
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
    return data.response; // ✅ Match the backend JSON key
  } catch (error) {
    console.error("Failed to fetch from Tex:", error);
    return "⚠️ Tex is currently offline or unreachable.";
  }
}
