"use client";
import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I’m Cypher, your AI Mentor. What’s your career question?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      // Append assistant reply (we will render it formatted)
      setMessages((prev) => [
        ...newMessages,
        { role: "assistant", content: data.reply || "Sorry, no reply." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Format assistant content: preserves lists if present, otherwise breaks into points
  const renderAssistantContent = (text) => {
    if (!text) return null;
    const raw = String(text).trim();

    // If text already contains explicit list markers or multiple lines, use them
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    const hasListMarkers = lines.some((l) => /^\s*(?:-|\*|\d+\.)\s+/.test(l));

    if (hasListMarkers) {
      // Render as ordered/unordered list depending on marker types
      const items = lines.map((line) => {
        const isNumbered = /^\s*\d+\.\s+/.test(line);
        const content = line.replace(/^\s*(?:-|\*|\d+\.)\s+/, "");
        return { content, isNumbered };
      });

      const allNumbered = items.every((i) => i.isNumbered);

      if (allNumbered) {
        return <ol className="list-decimal list-inside space-y-2">{items.map((it, idx) => <li key={idx}>{it.content}</li>)}</ol>;
      } else {
        return <ul className="list-disc list-inside space-y-2">{items.map((it, idx) => <li key={idx}>{it.content}</li>)}</ul>;
      }
    }

    // If multiple lines but no explicit markers, split into sentences for bullet points
    const oneLine = lines.join(" ");
    const sentences = oneLine.split(/(?<=[.?!])\s+(?=[A-Z0-9])/u).map(s => s.trim()).filter(Boolean);

    if (sentences.length > 1) {
      return <ul className="list-disc list-inside space-y-2">{sentences.map((s, i) => <li key={i}>{s}</li>)}</ul>;
    }

    // Fallback: render as paragraph (preserves short responses)
    return <p className="whitespace-pre-wrap">{raw}</p>;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Cypher AI</h1>

      <div className="w-full max-w-2xl bg-slate-800/50 p-4 rounded-xl shadow-lg overflow-y-auto h-[70vh] mb-4 border border-white/10">
        {messages.map((msg, i) => (
          <div key={i} className={`my-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "user" ? (
              <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white max-w-[85%] break-words">
                {msg.content}
              </div>
            ) : (
              <div className="inline-block bg-slate-700 text-gray-100 p-4 rounded-lg max-w-[85%] break-words">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-semibold text-white">
                      C
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-indigo-200 mb-2">Cypher — AI Mentor</div>
                    <div className="text-sm text-gray-100">
                      {renderAssistantContent(msg.content)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && <p className="text-gray-400 mt-2">Cypher is typing...</p>}

        <div ref={endRef} />
      </div>

      <div className="flex w-full max-w-2xl">
        <textarea
          rows={1}
          className="flex-1 p-3 rounded-l-lg bg-slate-700 border border-white/20 text-white resize-none focus:outline-none"
          placeholder="Ask me about careers..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 rounded-r-lg font-semibold hover:opacity-90 transition"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
