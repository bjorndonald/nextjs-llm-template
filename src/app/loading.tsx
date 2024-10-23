
import {cx} from "react-twc";
import React from "react";

const Loading = (props: { sm?: boolean }) => {
  return (
    <div
      className={cx(
        "flex w-full flex-1 flex-col items-center justify-center p-4",
        !props.sm ? "min-h-screen" : "h-full",
      )}
    >
      <span className="loading loading-spinner loading-lg"></span>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
