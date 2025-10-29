# CTRL & Create — Next.js + Tailwind + AI Chat + FAQ KB

Includes:
- Floating chat widget (`app/components/ChatWidget.tsx`)
- Serverless API route (`/api/chat`) calling OpenAI
- Built-in FAQ knowledge base (`app/lib/kb.ts`) with retrieval + guardrails

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. On **vercel.com** → New Project → Import → Deploy.
3. Add env var: `OPENAI_API_KEY`.
4. Redeploy. Visit your URL (chat bubble bottom-right).

## Local dev
```bash
npm install
export OPENAI_API_KEY=sk-...   # or set via .env.local (if you prefer)
npm run dev
```

## Customize the KB
Edit `app/lib/kb.ts` to add/update Q&A. Answers will be preferred when user questions match.
