import React from "react";

const TopHeading = (props) => {
  const { title } = props;
  return (
    <h3 className="text-color sm:text-lg font-semibold tracking-wide">
      {title}
    </h3>
  );
};

export default TopHeading;
