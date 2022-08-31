import React from "react";

const AppButton = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className="app--button">
      {title}
    </button>
  );
};

export default AppButton;
