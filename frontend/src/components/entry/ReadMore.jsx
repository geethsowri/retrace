import { useState } from "react";
import ModalLayout from "../ModalLayout";

const ReadMore = ({
  formattedDate,
  title,
  mood,
  content,
  formattedUpdateAt,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition"
        onClick={() => setOpen(true)}
      >
        Read More
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            <span className="text-2xl">{mood}</span>
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
          <div className="h-px bg-white/[0.06]" />
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</p>
          <div className="text-right text-xs text-gray-600">Edited {formattedUpdateAt}</div>
        </div>
      </ModalLayout>
    </>
  );
};

export default ReadMore;
