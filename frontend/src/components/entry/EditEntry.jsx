import ModalLayout from "../ModalLayout";
import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetEntryQuery,
  useUpdateEntryMutation,
  useClassifyMoodMutation,
} from "../../redux/api/entriesApiSlice";
import toast from "react-hot-toast";

const MOODS = [
  { emoji: "🙂", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

const EditEntry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: getEntry, isLoading: entryLoading } = useGetEntryQuery(id, {
    skip: !open,
  });
  const [updateEntry, { isLoading: entryUpdating }] = useUpdateEntryMutation();
  const [classifyMood] = useClassifyMoodMutation();
  const isLoading = entryLoading || entryUpdating;

  const [formData, setFormData] = useState({ title: "", content: "", date: "" });
  const [mood, setMood] = useState("");
  const [detecting, setDetecting] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (getEntry) {
      setFormData({
        title: getEntry.data?.title || "",
        content: getEntry.data?.content || "",
        date: new Date(getEntry.data?.date).toISOString().slice(0, 10) || "",
      });
      setMood(getEntry.data?.mood || "");
    }
  }, [getEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "content") {
      clearTimeout(debounceRef.current);
      if (value.trim().length < 10) return;
      setDetecting(true);
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await classifyMood(value).unwrap();
          setMood(res.mood);
        } catch {
          // silent — user can pick manually
        } finally {
          setDetecting(false);
        }
      }, 800);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateEntry({ id, data: { ...formData, mood: mood || "🙂" } }).unwrap();
      setOpen(false);
      toast.success(res?.message || "Entry updated.");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/10 transition"
      >
        <Pencil size={14} />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">Edit Entry</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400" htmlFor={`title.${id}`}>Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                name="title"
                id={`title.${id}`}
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Give your entry a title"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-gray-400" htmlFor={`date.${id}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  id={`date.${id}`}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 transition"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-gray-400" htmlFor={`mood.${id}`}>
                  Mood {detecting && <span className="text-indigo-400 text-xs ml-1">detecting...</span>}
                </label>
                <select
                  id={`mood.${id}`}
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 transition"
                >
                  <option value="" disabled>AI will detect</option>
                  {MOODS.map((m) => (
                    <option key={m.emoji} value={m.emoji}>
                      {m.emoji} {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400" htmlFor={`content.${id}`}>Content <span className="text-red-400">*</span></label>
              <textarea
                name="content"
                id={`content.${id}`}
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write your thoughts..."
                className="w-full px-3 py-2.5 h-40 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500/50 transition"
              />
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition disabled:opacity-50">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default EditEntry;
