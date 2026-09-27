export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-lg font-bold">
            Nova<span className="text-accent-2">Build</span>
          </p>
          <p className="mt-1 text-sm text-white/50">
            Building digital growth engines for local businesses.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-white/60">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} NovaBuild Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
