import { useParams } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";

import { useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const EditNote = () => {
  const { id } = useParams();
  const { isManager, isAdmin, username } = useAuth();

  // const note = useSelector((state) => selectNoteById(state, id));
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p>No access</p>;
    }
  }
  const content = <EditNoteForm note={note} users={users} />;

  // const users = useSelector(selectAllUsers);
  // const content =
  //   note && users ? (
  //     <EditNoteForm note={note} users={users} />
  //   ) : (
  //     <p>Loading...</p>
  //   );

  return content;
};

export default EditNote;
