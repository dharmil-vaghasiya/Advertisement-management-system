import React from "react";
import ShopNavbar from "./ShopNavbar";
import NSearch from "./NSearch";
var stylesheet = document.styleSheets[0];
const ShopHome = () => {
  stylesheet.disabled = true;
  return (
    <>
      <ShopNavbar />

      <div className="m-3">
        <NSearch />
      </div>
    </>
  );
};

export default ShopHome;
