import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log(users);

  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError)
    content = (
      <p
        className={`${
          isError
            ? "inline-block text-red-700 p-[0.25rem] mb-[0.5rem]"
            : "offscreen"
        }`}
      >
        {error?.data.mesage}
      </p>
    );
  if (isSuccess) {
    const { ids } = users;
    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <div className="min-h-screen rounded-lg w-full p-6 font-nunito  mt-[60px]">
        <table className="w-full p-10 gap-[0.1rem] text-gray-800 text-base md:text-lg">
          <thead className="sticky top-0 z-9">
            <tr className="contents">
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Username
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Roles
              </th>
              <th
                scope="col"
                className="bg-white border border-gray-800 text-left p-2"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="contents">{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default UsersList;
