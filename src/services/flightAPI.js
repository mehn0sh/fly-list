import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: ({ sortField, sortOrder }) => {
        return `flights?_sort=${sortField}&_order=${sortOrder}`;
      },
    }),

    getFlightsBySearch: builder.query({
      async queryFn(searchTerm, _queryApi, _extraOptions, fetchWithBQ) {
        const fromResponse = await fetchWithBQ(`flights?from_like=${searchTerm}`);
        const toResponse = await fetchWithBQ(`flights?to_like=${searchTerm}`);
    
        if (fromResponse.error) return { error: fromResponse.error };
        if (toResponse.error) return { error: toResponse.error };
    
        const combinedResults = [...fromResponse.data, ...toResponse.data];
    
        const uniqueResults = combinedResults.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );
    
        return { data: uniqueResults };
      },
    }),
    

    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `flights/${id}`,
        method: "DELETE",
      }),
    }),
    updateFlight: builder.mutation({
      query: ({ id, updatedFlight }) => ({
        url: `flights/${id}`,
        method: "PUT",
        body: updatedFlight,
      }),
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useDeleteFlightMutation,
  useAddFlightMutation,
  useUpdateFlightMutation,
  useGetFlightsBySearchQuery 
} = flightsApi;
