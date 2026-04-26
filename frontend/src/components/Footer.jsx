const Footer = () => {
  return (
    <footer className="border-t border-white/[0.05] text-gray-600 text-xs py-5 px-4 mt-auto w-full">
      <p className="text-center flex flex-wrap justify-center items-center gap-1">
        <span className="text-gray-400 font-medium">reTrace</span> — built by{" "}
        <a
          href="https://geethsowri.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-300 transition underline underline-offset-4"
        >
          Geeth Sowri ↗
        </a>
      </p>
    </footer>
  );
};

export default Footer;
