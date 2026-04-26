const ModalLayout = ({ isOpen, close, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto transition-all duration-200 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      aria-modal="true"
      role="dialog"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className={`relative bg-[#111] border border-white/[0.07] rounded-2xl shadow-2xl max-w-lg w-full mx-4 my-16 text-gray-200 transition-all duration-200 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}`}>
        <button
          onClick={close}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/10 transition text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
export default ModalLayout;
