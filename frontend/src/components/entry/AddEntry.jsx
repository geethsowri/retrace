import ModalLayout from "../ModalLayout";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  useAddEntryMutation,
  useClassifyMoodMutation,
} from "../../redux/api/entriesApiSlice";
import toast from "react-hot-toast";

const MOODS = [
  { emoji: "🙂", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

const AddEntry = () => {
  const [open, setOpen] = useState(false);
  const [addEntry, { isLoading }] = useAddEntryMutation();
  const [classifyMood] = useClassifyMoodMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [mood, setMood] = useState("");
  const [detecting, setDetecting] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
      });
      setMood("");
      setDetecting(false);
    }
  }, [open]);

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
      const res = await addEntry({ ...formData, mood: mood || "🙂" }).unwrap();
      toast.success(res.message || "Entry saved.");
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't save your entry.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex justify-center items-center transition shadow-lg shadow-indigo-500/20"
      >
        <FaPlus />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">New Entry</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400" htmlFor="title">Title <span className="text-red-400">*</span></label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required
                placeholder="Give your entry a title..."
                className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
            </div>

            <div className="flex gap-3">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-gray-400" htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 transition" />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-gray-400" htmlFor="mood">
                  Mood {detecting && <span className="text-indigo-400 text-xs ml-1">detecting...</span>}
                </label>
                <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 focus:outline-none focus:border-indigo-500/50 transition">
                  <option value="" disabled>AI will detect</option>
                  {MOODS.map((m) => <option key={m.emoji} value={m.emoji}>{m.emoji} {m.label}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400" htmlFor="content">Content <span className="text-red-400">*</span></label>
              <textarea name="content" id="content" value={formData.content} onChange={handleChange} required
                placeholder="Write your thoughts, memories, or feelings..."
                className="w-full px-3 py-2.5 h-40 bg-white/5 border border-white/[0.07] rounded-lg text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500/50 transition" />
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition disabled:opacity-50">
              {isLoading ? "Saving..." : "Save Entry"}
            </button>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default AddEntry;
