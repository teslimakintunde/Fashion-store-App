import React from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0]?.id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/projects");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError
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

  const date = new Date("2025-05-28T16:58:00+01:00"); // May 28, 2025, 04:58 PM WAT
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-nunito  mt-[20px]">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="bg-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-[24px] lg:text-4xl md:text-5xl font-bold mb-6">
            Create New Project -{" "}
            <span className="text-yellow-300">Chic Creations</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Add a new client fashion project for your team
          </p>
          <p className="text-base text-gray-100">{today}</p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className={errClass}>{error?.data?.message}</p>
          <form className="flex flex-col gap-6" onSubmit={onSaveNoteClicked}>
            <div className="flex flex-col gap-5 sm:flex-row justify-between sm:items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Note Details
              </h2>
              <button
                type="submit"
                className="bg-blue-600 w-fit text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Save Note"
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
                Save Note
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validTitleClass} transition-colors text-sm`}
                  id="title"
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
                  htmlFor="username"
                >
                  Assigned To
                </label>
                <select
                  id="username"
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
                  htmlFor="text"
                >
                  Text
                </label>
                <textarea
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validTextClass} transition-colors text-sm min-h-[120px]`}
                  id="text"
                  name="text"
                  value={text}
                  onChange={onTextChanged}
                />
                {!text && text !== "" && (
                  <p className="text-red-600 text-sm mt-1">Text is required.</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
  return content;
};

export default NewNoteForm;
