import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const PROJECTS_REGEX = /^\/dash\/projects(\/)?$/;
const DESIGNERS_REGEX = /^\/dash\/designers(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isManager, isAdmin } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onNewProjectClicked = () => navigate("/dash/projects/new");
  const onNewDesignerClicked = () => navigate("/dash/designers/new");
  const onProjectsClicked = () => navigate("/dash/projects");
  const onDesignersClicked = () => navigate("/dash/designers");

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  // Base button styles for consistency
  const buttonBaseStyles =
    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50";
  const buttonPrimaryStyles =
    "bg-yellow-300 text-purple-800 hover:bg-yellow-400 hover:shadow-md";
  const buttonSecondaryStyles =
    "bg-white text-purple-600 hover:bg-purple-100 hover:shadow-md";

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      navigate("/login"); // 👈 force redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const logOutButton = (
    <button
      className={`${buttonBaseStyles} ${buttonPrimaryStyles}`}
      title="Logout"
      onClick={handleLogout}
      disabled={isLoading}
    >
      Logout
    </button>
  );

  let newProjectButton = null;
  if (PROJECTS_REGEX.test(pathname)) {
    newProjectButton = (
      <button
        className={`${buttonBaseStyles} ${buttonSecondaryStyles}`}
        title="New Project"
        onClick={onNewProjectClicked}
      >
        New Project
      </button>
    );
  }

  let newDesignerButton = null;
  if (DESIGNERS_REGEX.test(pathname)) {
    newDesignerButton = (
      <button
        className={`${buttonBaseStyles} ${buttonSecondaryStyles}`}
        title="New Designer"
        onClick={onNewDesignerClicked}
      >
        Add New Designer
      </button>
    );
  }

  let designerButton = null;
  if (isManager || isAdmin) {
    if (!DESIGNERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      designerButton = (
        <button
          className={`${buttonBaseStyles} ${buttonSecondaryStyles}`}
          title="Designers"
          onClick={onDesignersClicked}
        >
          Designers
        </button>
      );
    }
  }

  let projectButton = null;
  if (!PROJECTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    projectButton = (
      <button
        className={`${buttonBaseStyles} ${buttonSecondaryStyles}`}
        onClick={onProjectsClicked}
      >
        Projects
      </button>
    );
  }

  const dashClass =
    !DASH_REGEX.test(pathname) &&
    !PROJECTS_REGEX.test(pathname) &&
    !DESIGNERS_REGEX.test(pathname)
      ? "py-2 px-4"
      : "py-4 px-10";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging out...</p>;
  } else {
    buttonContent = (
      <div className="flex flex-row gap-2 md:gap-3 flex-wrap">
        {newProjectButton}
        {newDesignerButton}
        {projectButton}
        {designerButton}
        {logOutButton}
      </div>
    );
  }

  return (
    <header className="fixed w-full top-0 z-20 bg-purple-600 text-white shadow-lg transition-all duration-300">
      <div
        className={`container mx-auto flex flex-row justify-between items-center ${dashClass}`}
      >
        <Link
          to="/dash"
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-yellow-300">Chic</span> Creations
          </h1>
        </Link>
        {/* Hamburger Menu Button */}
        <button
          className="sm:hidden text-2xl p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* <nav className="flex flex-row gap-10">
          <div className="flex flex-row gap-2 md:gap-3 flex-wrap">
            {buttonContent}
          </div>
        </nav> */}
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex flex-row gap-10">
          {isLoading ? <p>Logging out...</p> : buttonContent}
        </nav>
      </div>
      {/* Mobile Navigation */}
      <nav
        className={`sm:hidden bg-purple-700 overflow-hidden transition-all duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {isLoading ? (
            <p className="text-center">Logging out...</p>
          ) : (
            <div className="flex flex-col gap-3 animate-slideIn">
              {buttonContent}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DashHeader;
