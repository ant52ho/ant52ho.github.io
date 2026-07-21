import { useLocation } from "react-router-dom";
import MyNavbar from "components/MyNavbar/MyNavbar";
import Footer from "components/Footer/Footer";

const FULL_PAGE_ROUTES = new Set(["/track-map"]);

const SiteLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isFullPage = FULL_PAGE_ROUTES.has(pathname);

  return (
    <>
      {!isFullPage && <MyNavbar />}
      <div className={isFullPage ? undefined : "pages"}>{children}</div>
      {!isFullPage && <Footer />}
    </>
  );
};

export default SiteLayout;
