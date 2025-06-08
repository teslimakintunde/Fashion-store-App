import React, { memo } from "react";

import { useGetNotesQuery } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Note = ({ noteId }) => {
  // const note = useSelector((state) => selectNoteById(state, noteId));

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();
  if (note) {
    const handleEdit = () => navigate(`/dash/projects/${noteId}`);
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    return (
      <tr className="font-nunito p-10 animate-fadeIn">
        <td className="bg-white border border-gray-800 p-2 sm:p-3">
          {note.completed ? (
            <span className="note__status--completed text-green-600">
              completed
            </span>
          ) : (
            <span className="note__status--open text-yellow-600">Open</span>
          )}
        </td>
        <td className=" hidden sm:table-cell bg-white border border-gray-800 p-2 sm:p-3">
          {created}
        </td>
        <td className=" hidden sm:table-cell bg-white border border-gray-800 p-2 sm:p-3">
          {updated}
        </td>
        <td className="bg-white border border-gray-800 p-2">{note.title}</td>
        <td className="hidden sm:table-cell bg-white border border-gray-800 p-2 sm:p-3 ">
          {note.username}
        </td>
        <td className="bg-white border border-gray-800 p-2">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

// const memoizedNote = memo(Note);

export default memo(Note);
