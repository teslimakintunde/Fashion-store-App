import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="bg-gradient-to-br from-purple-50 to-gray-100 mt-[40px]">
      <div className="container mx-auto py-12 max-w-4xl">
        {/* Header */}
        <header className="bg-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome {username} to{" "}
            <span className="text-yellow-300">Chic Creations</span> Dashboard
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Manage your client fashion projects and designer settings with ease
          </p>
          <p className="text-base text-gray-100 mt-4">{today}</p>
        </header>

        {/* Links Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/dash/projects"
              className="flex items-center bg-purple-50 p-4 rounded-lg text-gray-800 hover:bg-purple-100 transition-colors"
            >
              <ArrowRight className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-lg font-medium">View Client Projects</span>
            </Link>
            <Link
              to="/dash/projects/new"
              className="flex items-center bg-purple-50 p-4 rounded-lg text-gray-800 hover:bg-purple-100 transition-colors"
            >
              <ArrowRight className="h-6 w-6 text-purple-600 mr-3" />
              <span className="text-lg font-medium">
                Add New Client Project
              </span>
            </Link>
            {(isManager || isAdmin) && (
              <>
                <Link
                  to="/dash/designers"
                  className="flex items-center bg-purple-50 p-4 rounded-lg text-gray-800 hover:bg-purple-100 transition-colors"
                >
                  <ArrowRight className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-lg font-medium">
                    View Designer Settings
                  </span>
                </Link>
              </>
            )}
            {(isManager || isAdmin) && (
              <Link
                to="/dash/designers/new"
                className="flex items-center bg-purple-50 p-4 rounded-lg text-gray-800 hover:bg-purple-100 transition-colors"
              >
                <ArrowRight className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-lg font-medium">Add New Designer</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
  return content;
};

export default Welcome;
