// icon related utils
import logo from "images/logo.png";
import heart from "../images/heart.png";
import chad from "../images/chad logo.png";

export const getNavbarIcon = (user) => {
  var src;
  var className;

  if (user === "clare") {
    src = heart;
    className = "d-inline-block align-top navLogo bg-light";
  } else if (user === "ehsan") {
    src = chad;
    className = "d-inline-block align-top rounded";
  } else {
    src = logo;
    className = "d-inline-block align-top navLogo";
  }

  return (
    <>
      <img alt="Icon" src={src} width="30" height="30" className={className} />
    </>
  );
};
