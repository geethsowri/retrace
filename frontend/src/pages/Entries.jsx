import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  useGetEntriesQuery,
  useSearchEntryQuery,
  useBulkDeleteEntriesMutation,
} from "../redux/api/entriesApiSlice";
import EntryCard from "../components/entry/EntryCard";
import AddEntry from "../components/entry/AddEntry";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const Entries = () => {
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDelete, { isLoading: isDeleting }] = useBulkDeleteEntriesMutation();

  if (!user) return <Navigate to="/login" replace />;

  const { data: getEntries, isLoading: isLoadingEntries } = useGetEntriesQuery(
    undefined,
    { skip: searchQuery.length > 0 }
  );

  const { data: searchResult, isLoading: isLoadingSearch } =
    useSearchEntryQuery(searchQuery, {
      skip: searchQuery.length === 0,
    });

  if (isLoadingEntries || isLoadingSearch) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100dvh-64px-52px)] bg-[#0f0f0f] text-gray-200">
        <Loader />
      </div>
    );
  }

  const entries =
    searchQuery.length > 0 ? searchResult?.data || [] : getEntries?.data || [];

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === entries.length ? [] : entries.map((e) => e._id)
    );
  };

  const handleBulkDelete = async () => {
    try {
      const res = await bulkDelete(selectedIds).unwrap();
      toast.success(res.message);
      setSelectedIds([]);
    } catch (err) {
      toast.error(err?.data?.message || "Bulk delete failed.");
    }
  };

  const EmptyState = ({ title, subtitle }) => (
    <div className="text-center px-6 py-16 min-h-[calc(100dvh-64px-52px-40px)] bg-[#0f0f0f] text-gray-300">
      <p className="text-2xl font-semibold mb-4">{title}</p>
      <p className="text-lg text-gray-400">{subtitle}</p>
      <div className="fixed bottom-16 right-10 z-10">
        <AddEntry />
      </div>
    </div>
  );

  if (entries.length === 0) {
    return searchResult ? (
      <EmptyState
        title={`No luck, ${user.data.firstName}.`}
        subtitle="Nothing matches your search. Try different keywords."
      />
    ) : (
      <EmptyState
        title={`Welcome, ${user.data.firstName}`}
        subtitle="Looks like your journal's empty. Hit the + button to start writing."
      />
    );
  }

  return (
    <div className={`bg-[#080808] min-h-screen text-gray-200 px-6 pb-20 ${selectedIds.length > 0 ? "pt-20" : "pt-6"}`}>
      {selectedIds.length > 0 && (
        <div className="fixed top-16 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="text-sm text-indigo-400 hover:text-indigo-300 whitespace-nowrap"
            >
              {selectedIds.length === entries.length ? "Deselect all" : "Select all"}
            </button>
            <span className="text-sm text-gray-400">{selectedIds.length} selected</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedIds([])}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition disabled:opacity-50 whitespace-nowrap"
            >
              <Trash2 size={14} />
              {isDeleting ? "Deleting..." : `Delete ${selectedIds.length}`}
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-16 right-10 z-10">
        <AddEntry />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {entries.map((entry) => (
          <EntryCard
            key={entry._id}
            id={entry._id}
            date={entry.date}
            title={entry.title}
            mood={entry.mood}
            content={entry.content}
            updatedAt={entry.updatedAt}
            highlightText={searchQuery}
            isSelected={selectedIds.includes(entry._id)}
            onToggleSelect={toggleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Entries;
