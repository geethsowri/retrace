import apiSlice from "./apiSlice";

const entriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    classifyMood: builder.mutation({
      query: (content) => ({
        url: "/entries/classify-mood",
        method: "POST",
        body: { content },
      }),
    }),

    addEntry: builder.mutation({
      query: (data) => ({
        url: "/entries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Entries"],
    }),

    getEntries: builder.query({
      query: () => "/entries",
      providesTags: ["Entries"],
    }),

    getEntry: builder.query({
      query: (id) => `/entries/${id}`,
    }),

    updateEntry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/entries/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Entries"],
    }),

    deleteEntry: builder.mutation({
      query: (id) => ({
        url: `/entries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Entries"],
    }),

    bulkDeleteEntries: builder.mutation({
      query: (ids) => ({
        url: "/entries/bulk",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Entries"],
    }),

    searchEntry: builder.query({
      query: (data) => ({
        url: "/entries/search",
        method: "GET",
        params: { text: data },
      }),
    }),
  }),
});

export const {
  useClassifyMoodMutation,
  useAddEntryMutation,
  useGetEntriesQuery,
  useGetEntryQuery,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
  useBulkDeleteEntriesMutation,
  useSearchEntryQuery,
} = entriesApiSlice;