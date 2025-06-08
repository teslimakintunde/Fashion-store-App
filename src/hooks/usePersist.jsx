import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  return [persist, setPersist];
};

export default usePersist;
