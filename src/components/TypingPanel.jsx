import React, { useState } from "react";
import { fetchFromTex } from "@/utils/texAPI";

export default function TypingPanel() {
  const [inputText, setInputText] = useState("");
  const [texReply, setTexReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setTexReply("🧠 Tex is thinking...");

    const reply = await fetchFromTex(inputText);

    setTexReply(reply);
    setLoading(false);
    setInputText("");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 px-4 text-white">
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ask Tex something..."
        className="p-3 rounded-md bg-black text-white border border-gray-600 w-full max-w-md"
      />

      <div className="mt-6 text-xl text-center">
        {loading ? "🧠 Tex is thinking..." : texReply}
      </div>
    </div>
  );
}
