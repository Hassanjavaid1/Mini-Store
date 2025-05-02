"use client";

import Context from "./Context";

function ComponentsWrapper({ children }) {
  return (
    <>
      <Context>{children}</Context>
    </>
  );
}

export default ComponentsWrapper;
