import React from "react";

import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";

import EditUserForm from "./EditUserForm";
import PulseLoader from "react-spinners/PulseLoader";

const EditUser = () => {
  const { id } = useParams();
  // const user = useSelector((state) => selectUserById(state, id));

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  // const content = user ? (
  //   <EditUserForm user={user} />
  // ) : (
  //   <p className="text-gray-600 text-center">Loading...</p>
  // );
  return content;
};

export default EditUser;
