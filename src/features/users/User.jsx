import { memo } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const User = ({ userId }) => {
  // const user = useSelector((state) => selectUserById(state, userId));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    // const cellStatus = user.active ? "" : "bg-gray-300 text-gray-500";
    const cellStatus = user.active ? "" : "bg-gray-300";

    return (
      <tr className="font-nunito p-10">
        <td className={`bg-white border border-gray-800 p-2 ${cellStatus}`}>
          {user.username}
        </td>
        <td className={`bg-white border border-gray-800 p-2 ${cellStatus}`}>
          {userRolesString}
        </td>
        <td
          className={`bg-white border border-gray-800 p-2 ${cellStatus} grid place-content-center`}
        >
          <button
            className="text-blue-600 hover:scale-125 transition-transform p-1 text-xl md:text-2xl"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

// const memoizedUser = memo(User);

export default memo(User);
