import React from "react";

function Loader() {
  return (
    <svg
      version="1.1"
      id="L3"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      style={{ height: "145px", width: "145px" }}
    >
      <circle
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        cx="50"
        cy="50"
        r="44"
        style={{ opacity: 0.8 }}
      />
      <circle fill="#fff" stroke="#0059d6" strokeWidth="3" cx="8" cy="54" r="6">
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default Loader;
