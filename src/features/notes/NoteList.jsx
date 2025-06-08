import React from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NoteList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("NotesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>{error?.data?.message}</p>;
  if (isSuccess) {
    const { ids, entities } = notes;
    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }
    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <div className="min-h-screen rounded-lg w-full p-6 font-nunito mt-[60px]">
        <table className="w-full p-10 gap-[0.1rem] text-gray-800 text-base md:text-lg">
          <thead className="sticky top-0 z-9">
            <tr>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Username
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Created
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Updated
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Title
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Owner
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }
  return content;
};

export default NoteList;
