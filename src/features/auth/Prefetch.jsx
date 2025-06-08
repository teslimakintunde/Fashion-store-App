import React from "react";
import { useEffect } from "react";
import { store } from "../../app/store";
import { noteApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // const notes = store.dispatch(noteApiSlice.endpoints.getNotes.initiate());
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    store.dispatch(
      noteApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );

    // return () => {
    //   notes.unsubscribe();
    //   users.unsubscribe();
    // };
  }, []);

  return <Outlet />;
};

export default Prefetch;
