import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  const features = [
    { icon: "✦", title: "Daily Journaling", desc: "Build a writing habit. Track emotional growth over time." },
    { icon: "✦", title: "AI Mood Detection", desc: "Gemini reads your entry and detects your mood automatically." },
    { icon: "✦", title: "Full Entry Control", desc: "Add, edit, delete, and bulk-manage entries with ease." },
    { icon: "✦", title: "Secure & Private", desc: "JWT-protected, encrypted, and only yours." },
  ];

  return (
    <div className="bg-[#080808] text-gray-200 min-h-screen">
      {/* Hero */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100svh-64px)] relative px-4 text-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-gray-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Private journaling, powered by AI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {user ? `Welcome back,` : "Your thoughts,"}<br />
            <span className="text-transparent bg-clip-text text-white from-indigo-400 to-purple-400">
              {user ? user.data.firstName : "finally private"}
            </span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">
            {user
              ? "Your entries are waiting. Private, encrypted, and always ready."
              : "A minimal journal that keeps your thoughts secure and your mood in check."}
          </p>
          <Link
            to="/entries"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition duration-200"
          >
            {user ? "Go to Your Entries" : "Get Started"} →
          </Link>
        </div>
        <div className="absolute bottom-8 text-xs text-gray-600 animate-bounce">↓</div>
      </div>

      {/* Features */}
      <div className="py-24 px-4 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-indigo-400 text-center uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-12">Everything you need, nothing you don't</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition duration-200">
                <div className="text-indigo-400 text-lg mb-3">{icon}</div>
                <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
