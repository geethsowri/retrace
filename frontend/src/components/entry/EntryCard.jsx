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
      className={`bg-[#1a1a1a] border rounded-2xl shadow-md hover:shadow-lg transition duration-200 w-full max-w-md mx-auto flex flex-col justify-between ${
        isSelected ? "border-blue-500" : "border-[#2c2c2c]"
      }`}
    >
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <EditEntry id={id} />
          <DeleteEntry id={id} />
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        <h2 className="text-lg font-semibold text-gray-200">
          {mood} {highlightMatch(title)}
        </h2>
        <p className="text-sm text-gray-400 break-words leading-relaxed">
          {highlightMatch(contentLimit)}
        </p>
      </div>

      <div className="flex justify-between items-center px-4 pb-4 text-xs text-gray-600">
        <span>Edited: {formattedUpdateAt}</span>
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
