import { useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";
import heartUrl from "images/heart.png";
import logoUrl from "images/logo.png";

// dynamic updating favicon
const DynamicFavicon = () => {
  const getHeader = useAuthHeader();
  const userInfo = getHeader()
    ? jwtDecode(getHeader())
    : { username: "guest", userRole: "guest" };

  const favicon = document.querySelector("link[rel*='icon']");
  if (favicon) {
    if (userInfo.userRole === "clare") {
      favicon.href = heartUrl;
    } else {
      favicon.href = logoUrl;
    }
  }

  return <></>;
};

export default DynamicFavicon;
