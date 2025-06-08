import { apiSlice } from "../../app/apiSlice/apiSlice";
import { logOut, setCredential } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth",
        method: "POST",
        body: { ...credential },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          if (!response.data) {
            throw new Error("No data received from refresh endpoint");
          }

          const { accessToken } = response.data; // Fix typo here (2 'c's)
          dispatch(setCredential({ accessToken }));
          // dispatch(setCredential({ accessToken }));
        } catch (error) {
          console.error("Refresh mutation failed:", error);
          throw error; // Let PersistLogin handle the error
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
