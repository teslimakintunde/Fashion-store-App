import React from "react";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRef } from "react";
import { useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  // const navigate = useNavigate();

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.MODE === "production") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error("Refresh failed:", err);
        }
      };
      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p>
        {`${error?.data?.message} - `}
        <Link to={"/login"}>Please login again</Link>{" "}
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
