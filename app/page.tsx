export default function Page() {
  return (
    <div className="font-sans">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CTRL & Create logo" className="h-10 w-10 object-contain" />
            <span className="font-extrabold tracking-tight text-xl">
              CTRL <span className="text-royal">&</span> Create
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-royal">Services</a>
            <a href="#pricing" className="hover:text-royal">Pricing</a>
            <a href="#contact" className="px-4 py-2 rounded-xl bg-royal text-white shadow hover:shadow-md transition">Get a Quote</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050a30] via-[#0b0f4a] to-[#1800ad]" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-28 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
            Design smarter. Build faster. Pay less.
          </h1>
          <p className="mt-5 text-lg text-white/90 max-w-prose">
            We combine human creativity with the power of AI to craft stunning, well-structured websites quickly—at a fraction of the cost.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#pricing" className="px-6 py-3 rounded-xl bg-white text-[#050a30] font-semibold hover:shadow-lg transition">See pricing</a>
            <a href="#contact" className="px-6 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10">Start a project</a>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What we build</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Card title="One-page sites" desc="Sleek landing pages with clear CTAs, contact forms, and responsive layouts." />
          <Card title="Business websites" desc="3–10 page sites with SEO, galleries, blogs, and lightweight e-commerce." />
          <Card title="Brand & content" desc="Logo polish, color systems, AI copywriting, and image generation." />
        </div>
      </section>

      <section id="pricing" className="bg-[#050a30] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Transparent pricing</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Price name="Starter" price="$600–$900" tagline="Perfect for launches" features={['One-page site','AI-assisted copy','Responsive + basic SEO','Contact form']} />
            <Price name="Business Pro" highlighted price="$1,000–$1,800" tagline="Best value for SMBs" features={['3–5 pages','SEO setup','Gallery / blog','Analytics + handoff']} />
            <Price name="Premium Custom" price="$2,000–$3,500" tagline="Bigger scope, still fast" features={['6–10 pages','Brand integration','Light e-commerce','AI visuals & copy']} />
          </div>
          <p className="mt-6 text-xs text-white/70">Add-ons: maintenance ($60–$100/mo), logo design ($150–$250), hosting setup ($150).</p>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Let’s build your site</h2>
            <p className="mt-3 text-slate-600">Tell us a bit about your project and we’ll reply with a tailored quote within one business day.</p>
            <form className="mt-8 grid gap-4" onSubmit={(e)=>{e.preventDefault(); const f = new FormData(e.currentTarget as HTMLFormElement); const subject = encodeURIComponent(`New project inquiry: ${f.get('company')||'Website'}`); const body = encodeURIComponent(`Name: ${f.get('name')}
Company: ${f.get('company')}
Email: ${f.get('email')}
Budget: ${f.get('budget')}
Timeline: ${f.get('timeline')}

Project details:
${f.get('details')}`); window.location.href = `mailto:ctrl@create.com?subject=${subject}&body=${body}`;}}>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" required placeholder="Your name" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal" />
                <input name="email" type="email" required placeholder="Email" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="company" placeholder="Company / brand" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal" />
                <input name="budget" placeholder="Budget (CAD)" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select name="timeline" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal">
                  <option>ASAP (1–2 weeks)</option>
                  <option>2–4 weeks</option>
                  <option>1–2 months</option>
                </select>
                <select name="package" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal">
                  <option>Starter</option>
                  <option>Business Pro</option>
                  <option>Premium Custom</option>
                </select>
              </div>
              <textarea name="details" rows={5} placeholder="Tell us about your audience, goals, and pages you need…" className="px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal"></textarea>
              <div className="flex items-center justify-between gap-4 mt-2">
                <button className="px-6 py-3 rounded-xl bg-royal text-white font-semibold hover:shadow-lg">Send inquiry</button>
                <a href="mailto:ctrl@create.com" className="text-royal underline underline-offset-4">Or email ctrl@create.com</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#050a30] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CTRL & Create" className="h-8 w-8" />
            <span className="font-semibold">CTRL & Create</span>
          </div>
          <p className="text-white/70 text-sm">© {new Date().getFullYear()} CTRL & Create — Montréal, QC</p>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function Price({ name, price, tagline, features, highlighted }:{ name:string; price:string; tagline:string; features:string[]; highlighted?:boolean }) {
  return (
    <div className={highlighted ? 'rounded-3xl p-6 bg-white text-[#050a30] border-transparent shadow-xl' : 'rounded-3xl p-6 bg-[#0b0f4a] border border-white/10'}>
      <div className="flex items-baseline justify-between">
        <h3 className={highlighted ? 'text-xl font-bold text-[#050a30]' : 'text-xl font-bold text-white'}>{name}</h3>
        <span className={highlighted ? 'text-sm text-slate-600' : 'text-sm text-white/70'}>{tagline}</span>
      </div>
      <div className={highlighted ? 'mt-3 text-3xl font-extrabold text-royal' : 'mt-3 text-3xl font-extrabold text-white'}>{price}</div>
      <ul className="mt-4 space-y-2">
        {features.map((f, i) => (
          <li key={i} className={highlighted ? 'flex items-center gap-2 text-slate-700' : 'flex items-center gap-2 text-white/90'}>
            <span className={highlighted ? 'h-2 w-2 rounded-full bg-royal' : 'h-2 w-2 rounded-full bg-sky-300'}></span>{f}
          </li>
        ))}
      </ul>
      <a href="#contact" className={highlighted ? 'mt-6 block w-full text-center px-4 py-3 rounded-xl bg-royal text-white font-semibold hover:shadow' : 'mt-6 block w-full text-center px-4 py-3 rounded-xl bg-white text-[#050a30] font-semibold hover:shadow'}>
        Choose {name}
      </a>
    </div>
  );
}
