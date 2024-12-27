import React from "react";
import { rightImage } from "../utils/imageUtils";

const Navbar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "end", top: "-10px" }}>
      <img src={rightImage} />
    </div>
  );
};

export default Navbar;
