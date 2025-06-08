import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ note, users }) => {
  const { isAdmin, isManager } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = () => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/projects");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const handleSubmit = async () => {
    try {
      if (canSave) {
        await updateNote({
          id: note.id,
          user: userId,
          title,
          text,
          completed,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteNote = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass =
    isError || isDelError
      ? "inline-block bg-red-50 text-red-600 px-4 py-3 mb-4 rounded-lg font-nunito"
      : "hidden";
  const validTitleClass =
    !title && title !== ""
      ? "border-2 border-red-600 focus:ring-red-600"
      : "focus:ring-blue-600";
  const validTextClass =
    !text && text !== ""
      ? "border-2 border-red-600 focus:ring-red-600"
      : "focus:ring-blue-600";

  const errContent = error?.data?.message || delerror?.data?.message || "";

  const date = new Date("2025-05-29T08:56:00+01:00"); // May 29, 2025, 08:56 AM WAT
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        type="button"
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        title="Delete Note"
        onClick={handleDeleteNote}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const content = (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-nunito">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="bg-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Edit Note #{note.ticket} -{" "}
            <span className="text-yellow-300">Tech Masters</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Update note details for your team
          </p>
          <p className="text-base text-gray-100">{today}</p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className={errClass}>{errContent}</p>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Edit Note #{note.ticket}
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Save Note"
                  onClick={handleSubmit}
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Save
                </button>
                {deleteButton}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="note-title"
                >
                  Title
                </label>
                <input
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validTitleClass} transition-colors text-sm`}
                  id="note-title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  value={title}
                  onChange={onTitleChanged}
                />
                {!title && title !== "" && (
                  <p className="text-red-600 text-sm mt-1">
                    Title is required.
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="note-username"
                >
                  Assigned To
                </label>
                <select
                  id="note-username"
                  name="username"
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors text-sm`}
                  value={userId}
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
                {!userId && (
                  <p className="text-red-600 text-sm mt-1">
                    Please select a user.
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="note-text"
                >
                  Text
                </label>
                <textarea
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validTextClass} transition-colors text-sm min-h-[120px]`}
                  id="note-text"
                  name="text"
                  value={text}
                  onChange={onTextChanged}
                />
                {!text && text !== "" && (
                  <p className="text-red-600 text-sm mt-1">Text is required.</p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="note-completed"
                >
                  Work Complete
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-6 h-6 text-blue-600 focus:ring-blue-600 rounded"
                    id="note-completed"
                    name="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={onCompletedChanged}
                  />
                  <span className="text-gray-800 text-sm">
                    {completed ? "Completed" : "Incomplete"}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-800 font-medium text-sm">Created:</p>
                  <p className="text-gray-600 text-sm">{created}</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">Updated:</p>
                  <p className="text-gray-600 text-sm">{updated}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
  return content;
};

export default EditNoteForm;
