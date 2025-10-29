'use client';
import { useEffect, useRef, useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'What’s included in Starter?',
  'How long does a typical project take?',
  'Can you connect my custom domain?',
  'Do you provide ongoing maintenance?'
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hi! I’m your AI assistant. Ask me about pricing, timelines, or services.' }
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      const reply = (data?.message ?? 'Sorry, I had trouble responding.');
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hmm, something went wrong. Try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  }

  function useSuggestion(s: string) {
    setInput(s);
    setTimeout(()=>{ (document.getElementById('chat-input') as HTMLInputElement)?.focus(); }, 0);
  }

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen(s => !s)}
        className="fixed bottom-6 right-6 rounded-full bg-royal text-white h-14 w-14 shadow-lg hover:shadow-xl transition grid place-items-center text-2xl"
      >
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[92vw] max-w-sm h-[60vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#050a30] text-white text-sm">
            <div className="font-semibold">Chat with CTRL & Create</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={()=>useSuggestion(s)} className="text-xs bg-white/10 px-2 py-1 rounded-full hover:bg-white/20">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 px-3 py-3 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={m.role === 'user'
                  ? 'inline-block rounded-2xl px-3 py-2 bg-royal text-white'
                  : 'inline-block rounded-2xl px-3 py-2 bg-slate-100 text-slate-900'}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={sendMessage} className="p-3 border-t border-slate-200 flex gap-2">
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, timelines..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal"
            />
            <button
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-royal text-white disabled:opacity-50"
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
