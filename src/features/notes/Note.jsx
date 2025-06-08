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
      <tr className="font-nunito p-10">
        <td className="bg-white border border-gray-800 p-2">
          {note.completed ? (
            <span className="note__status--completed">completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="bg-white border border-gray-800 p-2">{created}</td>
        <td className="bg-white border border-gray-800 p-2">{updated}</td>
        <td className="bg-white border border-gray-800 p-2">{note.title}</td>
        <td className="bg-white border border-gray-800 p-2">{note.username}</td>
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
