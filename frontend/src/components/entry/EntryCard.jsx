import ReadMore from "./ReadMore";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";

const EntryCard = ({
  id,
  date,
  title,
  mood,
  content,
  updatedAt,
  highlightText,
  isSelected,
  onToggleSelect,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedUpdateAt = new Date(updatedAt).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const contentLimit =
    content.length > 300 ? `${content.slice(0, 300)}...` : content;

  const highlightMatch = (text) => {
    if (!highlightText) return text;
    const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={index} className="text-blue-400 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`group relative bg-[#0f0f0f] border rounded-2xl transition duration-200 w-full max-w-md mx-auto flex flex-col ${
        isSelected ? "border-indigo-500/60 bg-indigo-950/10" : "border-white/[0.06] hover:border-white/[0.12]"
      }`}
    >
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
            className="w-3.5 h-3.5 accent-indigo-500 cursor-pointer"
          />
          <span className="text-xs text-gray-600">{formattedDate}</span>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <EditEntry id={id} />
          <DeleteEntry id={id} />
        </div>
      </div>

      <div className="px-4 py-3 flex-1 space-y-2">
        <h2 className="text-base font-semibold text-white leading-snug">
          <span className="mr-1.5">{mood}</span>{highlightMatch(title)}
        </h2>
        <p className="text-sm text-gray-500 break-words leading-relaxed">
          {highlightMatch(contentLimit)}
        </p>
      </div>

      <div className="flex justify-between items-center px-4 pb-4 text-xs text-gray-600">
        <span>Edited {formattedUpdateAt}</span>
        <ReadMore
          formattedDate={formattedDate}
          title={title}
          mood={mood}
          content={content}
          formattedUpdateAt={formattedUpdateAt}
        />
      </div>
    </div>
  );
};

export default EntryCard;
