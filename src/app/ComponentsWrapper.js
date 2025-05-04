"use client";

import { Suspense } from "react";
import Context from "./Context";

function ComponentsWrapper({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <Context>{children}</Context>
      </Suspense>
    </>
  );
}

export default ComponentsWrapper;
