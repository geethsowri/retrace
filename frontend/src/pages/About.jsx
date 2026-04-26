const items = [
  "Create, edit, and delete entries on your terms.",
  "Record key moments and build a personal timeline.",
  "AI-powered mood detection from your journal content.",
  "JWT-protected, encrypted, and stored securely.",
];

const About = () => {
  return (
    <div className="min-h-[calc(100svh-64px-52px)] flex items-start justify-center px-4 py-16 bg-[#080808]">
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs text-indigo-400 uppercase tracking-widest">About</p>
          <h1 className="text-3xl font-bold text-white">reTrace</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            A private journaling tool built for clarity and security. No noise. No tracking. Just your thoughts.
          </p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-6 space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">What you can do</p>
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
              <span className="text-indigo-500 mt-0.5 shrink-0">✦</span>
              {item}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://github.com/geethsowri/reTrace" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.08] text-sm text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition">
            View on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
