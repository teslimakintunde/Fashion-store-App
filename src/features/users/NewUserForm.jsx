import React from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ROLES } from "../../config/roles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

// const USER_REGEX = /^[A-Z]{3,20}$/;
// const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [AddNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/designers");
    }
  }, [isSuccess, navigate]);

  const onUserNameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await AddNewUser({ roles, username, password });
    }
  };
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // const errClass = isError ? "errmsg" : "offscreen";
  // const validUserClass = !validUsername ? "form__input--incomplete" : "";
  // const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  // const validRolesClass = !Boolean(roles.length)
  //   ? "form__input--incomplete"
  //   : "";

  // const errClass = isError
  //   ? "inline-block bg-white text-red-700 px-2 py-1 mb-2"
  //   : "hidden";
  // const validUserClass = !validUsername
  //   ? "border border-red-600 outline outline-red-600"
  //   : "";
  // const validPwdClass = !validPassword
  //   ? "border border-red-600 outline outline-red-600"
  //   : "";
  // const validRolesClass = !roles.length
  //   ? "border border-red-600 outline outline-red-600"
  //   : "";

  const errClass = isError
    ? "inline-block bg-red-50 text-red-600 px-4 py-3 mb-4 rounded-lg font-nunito"
    : "hidden";
  const validUserClass =
    !validUsername && username
      ? "border-2 border-red-600 focus:ring-red-600"
      : "focus:ring-blue-600";
  const validPasswordClass =
    !validPassword && password
      ? "border-2 border-red-600 focus:ring-red-600"
      : "focus:ring-blue-600";
  const validRolesClass = !roles.length
    ? "border-2 border-red-600 focus:ring-red-600"
    : "focus:ring-blue-600";

  const date = new Date("2025-05-28T15:09:00+01:00"); // May 28, 2025, 03:09 PM WAT
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  // const content = (
  //   <>
  //     <p className={errClass}>{error?.data?.message}</p>
  //     <form onSubmit={onSaveUserClicked} className="form">
  //       <div className="form__title-row">
  //         <h2>New User</h2>
  //         <div className="form__action-buttons">
  //           <button className="icon-button" title="Save" disabled={!canSave}>
  //             <FontAwesomeIcon icon={faSave} />
  //           </button>
  //         </div>
  //       </div>
  //       <label htmlFor="username" className="form__label">
  //         username: <span className="nowrap">[3-20 letters]</span>
  //       </label>
  //       <input
  //         type="text"
  //         className={`form__input ${validUserClass}`}
  //         id="username"
  //         autoComplete="off"
  //         value={username}
  //         onChange={onUserNameChanged}
  //       />
  //       <label htmlFor="password">
  //         Password: <span>[4-12 chars incl. !@#$%]</span>
  //       </label>
  //       <input
  //         type="password"
  //         className={`form__input ${validPwdClass}`}
  //         id="password"
  //         name="password"
  //         value={password}
  //         onChange={onPasswordChanged}
  //       />
  //       <label htmlFor="roles" className="form__label">
  //         AASIGNED ROLES:
  //       </label>
  //       <select
  //         name="roles"
  //         id="roles"
  //         className={`form__select ${validRolesClass}`}
  //         multiple={true}
  //         size={"3"}
  //         value={roles}
  //         onChange={onRolesChanged}
  //       >
  //         {options}
  //       </select>
  //     </form>
  //   </>
  // );
  const content = (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-nunito">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* <header className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create New User -{" "}
            <span className="text-yellow-300">Tech Masters</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Add a new user to manage your team efficiently
          </p>
          <p className="text-base text-gray-100">{today}</p>
        </header> */}
        <header className="bg-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
          <form className="flex flex-col gap-6" onSubmit={onSaveUserClicked}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                User Details
              </h2>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Save User"
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
                Save User
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="username"
                >
                  Username{" "}
                  <span className="text-gray-600 text-sm">[3-20 letters]</span>
                </label>
                <input
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validUserClass} transition-colors text-sm`}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  value={username}
                  onChange={onUserNameChanged}
                />
                {!validUsername && username && (
                  <p className="text-red-600 text-sm mt-1">
                    Username must be 3-20 letters (A-Z, a-z).
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="password"
                >
                  Password{" "}
                  <span className="text-gray-600 text-sm">
                    [4-12 chars, letters, numbers, !@#$%]
                  </span>
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 pr-10 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validPasswordClass} transition-colors text-sm`}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={onPasswordChanged}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-700"
                    onClick={toggleShowPassword}
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {!validPassword && password && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must be 4-12 characters, using letters (A-Z, a-z),
                    numbers (0-9), or !@#$%.
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-800 font-medium text-sm mb-2"
                  htmlFor="roles"
                >
                  Assigned Roles
                </label>
                <select
                  id="roles"
                  name="roles"
                  className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validRolesClass} transition-colors text-sm`}
                  multiple
                  size="3"
                  value={roles}
                  onChange={onRolesChanged}
                >
                  {options}
                </select>
                {!roles.length && (
                  <p className="text-red-600 text-sm mt-1">
                    At least one role must be selected.
                  </p>
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

export default NewUserForm;
