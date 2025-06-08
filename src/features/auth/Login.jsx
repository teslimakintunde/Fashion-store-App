import { useState, useRef } from "react";

import { useLoginMutation } from "./authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { setCredential } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredential({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server response");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg
    ? "inline-block bg-red-50 text-red-600 px-4 py-3 mb-4 rounded-lg font-nunito"
    : "hidden";

  const date = new Date("2025-05-30T07:47:00+01:00"); // May 30, 2025, 07:47 AM WAT
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center font-nunito">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-800 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const content = (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 font-nunito">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="bg-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client Login -{" "}
            <span className="text-yellow-300">Chic Creations</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-4">
            Sign in to manage your fashion projects
          </p>
          <p className="text-base text-gray-100">{today}</p>
        </header>
        <main className="bg-white rounded-lg shadow-lg p-8">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-800 font-medium text-sm mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`w-full p-3 rounded-lg border border-gray-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors text-sm ${
                  !username && username !== "" ? "border-2 border-red-600" : ""
                }`}
                id="username"
                ref={userRef}
                type="text"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="off"
                required
              />
              {!username && username !== "" && (
                <p className="text-red-600 text-sm mt-1">
                  Username is required.
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-800 font-medium text-sm mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full p-3 pr-10 rounded-lg border border-gray-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors text-sm ${
                    !password && password !== ""
                      ? "border-2 border-red-600"
                      : ""
                  }`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-600 hover:text-purple-700"
                  onClick={toggleShowPassword}
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {!password && password !== "" && (
                <p className="text-red-600 text-sm mt-1">
                  Password is required.
                </p>
              )}
            </div>
            <button
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </button>
            <label htmlFor="persist" className="flex items-center gap-1">
              <input
                type="checkbox"
                id="persist"
                checked={persist}
                onChange={handleToggle}
              />
              Trust This Device?
            </label>
          </form>
          <footer className="mt-6 text-center">
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              Back to Home
            </Link>
          </footer>
        </main>
      </div>
    </section>
  );

  return content;
};

export default Login;
