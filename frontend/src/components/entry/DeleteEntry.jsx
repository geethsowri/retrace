import ModalLayout from "../ModalLayout";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDeleteEntryMutation } from "../../redux/api/entriesApiSlice";
import toast from "react-hot-toast";

const DeleteEntry = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [deleteEntry, { isLoading }] = useDeleteEntryMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteEntry(id).unwrap();
      toast.success(response?.message || "Entry deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete the entry");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
      >
        <Trash2 size={14} />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Delete entry?</h2>
          <p className="text-sm text-gray-400">This can't be undone.</p>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-white/[0.08] text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={isLoading}
              className="flex-1 py-2.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm transition disabled:opacity-50">
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </ModalLayout>
    </>
  );
};

export default DeleteEntry;
