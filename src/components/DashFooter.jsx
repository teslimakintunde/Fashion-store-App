import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClick = () => navigate("/dash");
  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button title="home" onClick={onGoHomeClick}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-gray-800 text-white border-t border-gray-700 py-4">
      <div className="container mx-auto px-6 flex flex-row justify-start items-center gap-4">
        {goHomeButton}
        <p className="text-sm text-white">Current User: {username}</p>
        <p className="text-sm text-white">Status: {status}</p>
      </div>
    </footer>
  );
};

export default DashFooter;
