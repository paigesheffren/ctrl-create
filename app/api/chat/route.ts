import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { KB } from '../../lib/kb';

function score(q: string, text: string): number {
  // Simple scoring: count keyword overlaps (case-insensitive)
  const a = q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const bset = new Set(text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  let s = 0;
  for (const tok of a) if (bset.has(tok)) s++;
  return s;
}

function retrieveContext(userMsg: string, k = 3): string {
  const ranked = KB.map(item => ({
    item,
    s: score(item.q + ' ' + (item.tags?.join(' ') || ''), userMsg)
  })).sort((x, y) => y.s - x.s).slice(0, k);
  const useful = ranked.filter(r => r.s > 0).map(r => `Q: ${r.item.q}\nA: ${r.item.a}`);
  return useful.length ? useful.join('\n\n') : '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? [];
    const lastUser = messages.filter((m: any) => m.role === 'user').slice(-1)[0]?.content || '';
    const kbContext = retrieveContext(lastUser, 3);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const sysPrompt = `You are a helpful assistant for CTRL & Create, a Montréal-based, AI-assisted web design studio.
- Be concise and friendly.
- Prefer the facts from the KNOWLEDGE BASE when relevant.
- If a question is unrelated to web services, pricing, timelines, or our process, briefly decline and suggest emailing ctrl@create.com.
- Never invent prices beyond: Starter $600–$900; Business Pro $1,000–$1,800; Premium Custom $2,000–$3,500; add-ons: maintenance $60–$100/mo, logo $150–$250, hosting setup $150.
- If asked for exact quotes, say pricing depends on scope and we can provide a tailored quote via the contact form or email.
KNOWLEDGE BASE (for reference):
${kbContext || '(no relevant items matched — answer from general policy)'}
`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sysPrompt },
        ...messages.map((m: any) => ({ role: m.role, content: String(m.content || '') })),
      ],
      temperature: 0.2,
      max_tokens: 400
    });

    const msg = response.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    return NextResponse.json({ message: msg });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({ message: 'Server error. Please try again later.' }, { status: 500 });
  }
}
