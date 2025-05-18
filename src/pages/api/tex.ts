import type { NextApiRequest, NextApiResponse } from 'next';

/**  Edit this if your FastAPI URL is different  */
const TEX_ENDPOINT = 'http://localhost:8000/tex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ─────────────────────────────────────────────────────────
  // Only accept POST
  // ─────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // ─────────────────────────────────────────────────────────
  // Grab the prompt from the incoming request
  // ─────────────────────────────────────────────────────────
  const { prompt = '' } = (req.body ?? {}) as { prompt?: string };

  try {
    // ───────────────────────────────────────────────────────
    // Forward to Tex’s reasoning core (FastAPI)
    // ───────────────────────────────────────────────────────
    const upstream = await fetch(TEX_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error('FastAPI error:', text);
      return res.status(502).json({ error: 'Upstream FastAPI error', details: text });
    }

    const data = await upstream.json();  // ← whatever JSON FastAPI returns
    return res.status(200).json(data);
  } catch (err: any) {
    console.error('Fetch failed:', err);
    return res.status(500).json({ error: 'Tex backend unreachable', details: err.message });
  }
}
