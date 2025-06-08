import React from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect } from "react";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrashCan,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-Za-z]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUserNameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };
  const canSave = password
    ? [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    : [roles.length, validUsername].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
        password: password || undefined,
      });
    }
  };

  const onDeleteUser = async () => {
    await deleteUser({ id: user.id });
  };
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // const errClass = isError || isDelError ? "errmsg" : "offscreen";
  // const validUserClass = !validUsername ? "form__input--incomplete" : "";
  // const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  // const validRolesClass = !Boolean(roles.length)
  //   ? "form__input--incomplete"
  //   : "";

  const errClass =
    isError || isDelError
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

  const errContent = error?.data?.message || delerror?.data?.message || "";

  const date = new Date("2025-05-28T16:28:00+01:00"); // May 28, 2025, 04:28 PM WAT
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  // const content = (
  //   <>
  //     <p className={errClass}>{errContent}</p>
  //     <form onSubmit={(e) => e.preventDefault()} className="form">
  //       <div className="form__title-row">
  //         <h2>New User</h2>
  //         <div className="form__action-buttons">
  //           <button
  //             className="icon-button"
  //             title="Save"
  //             disabled={!canSave}
  //             onClick={onSaveUserClicked}
  //           >
  //             <FontAwesomeIcon icon={faSave} />
  //           </button>
  //           <button
  //             className="icon-button"
  //             title="Delete"
  //             disabled={!canSave}
  //             onClick={onDeleteUser}
  //           >
  //             <FontAwesomeIcon icon={faTrashCan} />
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

  //       <label
  //         htmlFor="user-active"
  //         className="form__label form__checkbox-container"
  //       >
  //         ACTIVE:
  //       </label>
  //       <input
  //         type="checkbox"
  //         id="user-active"
  //         name="user-active"
  //         checked={active}
  //         onChange={onActiveChanged}
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
  // const content = (
  //   <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-nunito">
  //     <div className="container mx-auto px-6 py-12 max-w-4xl">
  //       <header className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
  //         <h1 className="text-4xl md:text-5xl font-bold mb-4">
  //           Edit User - <span className="text-yellow-300">Tech Masters</span>
  //         </h1>
  //         <p className="text-lg md:text-xl opacity-90">
  //           Update user details and roles with ease
  //         </p>
  //         <p className="text-base text-gray-100 mt-4">{today}</p>
  //       </header>
  //       <div className="bg-white rounded-lg shadow-lg p-8">
  //         <p className={errClass}>{errContent}</p>
  //         <form
  //           className="flex flex-col gap-6"
  //           onSubmit={(e) => e.preventDefault()}
  //         >
  //           <div className="flex justify-between items-center">
  //             <h2 className="text-2xl font-semibold text-gray-800">
  //               User Details
  //             </h2>
  //             <div className="flex gap-3">
  //               <button
  //                 type="button"
  //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  //                 title="Save"
  //                 onClick={onSaveUserClicked}
  //                 disabled={!canSave}
  //               >
  //                 <FontAwesomeIcon icon={faSave} />
  //                 Save
  //               </button>
  //               <button
  //                 type="button"
  //                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
  //                 title="Delete"
  //                 onClick={onDeleteUser}
  //               >
  //                 <FontAwesomeIcon icon={faTrashCan} />
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //             <div>
  //               <label
  //                 className="block text-gray-800 font-medium text-lg mb-2"
  //                 htmlFor="username"
  //               >
  //                 Username{" "}
  //                 <span className="text-gray-600 text-sm">[3-20 letters]</span>
  //               </label>
  //               <input
  //                 className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validUserClass} transition-colors`}
  //                 id="username"
  //                 name="username"
  //                 type="text"
  //                 autoComplete="off"
  //                 value={username}
  //                 onChange={onUserNameChanged}
  //               />
  //             </div>
  //             <div>
  //               <label
  //                 className="block text-gray-800 font-medium text-lg mb-2"
  //                 htmlFor="password"
  //               >
  //                 Password{" "}
  //                 <span className="text-gray-600 text-sm">
  //                   [empty = no change, 4-12 chars incl. !@#$%]
  //                 </span>
  //               </label>
  //               <input
  //                 className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validPwdClass} transition-colors`}
  //                 id="password"
  //                 name="password"
  //                 type="password"
  //                 value={password}
  //                 onChange={onPasswordChanged}
  //               />
  //             </div>
  //             <div>
  //               <label
  //                 className="block text-gray-800 font-medium text-lg mb-2"
  //                 htmlFor="user-active"
  //               >
  //                 Active Status
  //               </label>
  //               <div className="flex items-center gap-3">
  //                 <input
  //                   className="w-6 h-6 text-blue-600 focus:ring-blue-600 rounded"
  //                   id="user-active"
  //                   name="user-active"
  //                   type="checkbox"
  //                   checked={active}
  //                   onChange={onActiveChanged}
  //                 />
  //                 <span className="text-gray-800 text-lg">
  //                   {active ? "Active" : "Inactive"}
  //                 </span>
  //               </div>
  //             </div>
  //             <div>
  //               <label
  //                 className="block text-gray-800 font-medium text-lg mb-2"
  //                 htmlFor="roles"
  //               >
  //                 Assigned Roles
  //               </label>
  //               <select
  //                 id="roles"
  //                 name="roles"
  //                 className={`w-full p-3 rounded-lg border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 ${validRolesClass} transition-colors`}
  //                 multiple
  //                 size="3"
  //                 value={roles}
  //                 onChange={onRolesChanged}
  //               >
  //                 {options}
  //               </select>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </section>
  // );
  const content = (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-nunito">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Edit User - <span className="text-yellow-300">Tech Masters</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Update user details and roles with ease
          </p>
          <p className="text-base text-gray-100 mt-4">{today}</p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className={errClass}>{errContent}</p>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                User Details
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Save"
                  onClick={onSaveUserClicked}
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  title="Delete"
                  onClick={onDeleteUser}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete
                </button>
              </div>
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
                    [empty = no change, 4-12 chars incl. !@#$%]
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
                  htmlFor="user-active"
                >
                  Active Status
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-6 h-6 text-blue-600 focus:ring-blue-600 rounded"
                    id="user-active"
                    name="user-active"
                    type="checkbox"
                    checked={active}
                    onChange={onActiveChanged}
                  />
                  <span className="text-gray-800 text-sm">
                    {active ? "Active" : "Inactive"}
                  </span>
                </div>
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

export default EditUserForm;
