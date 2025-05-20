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
    <div className="w-full text-center mt-10">
      <input
        className="text-black p-2 rounded-md w-[60%] max-w-md"
        placeholder="Ask Tex something..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      <div className="mt-6 text-white text-xl">
        {loading ? "🧠 Tex is thinking..." : texReply}
      </div>
    </div>
  );
}
