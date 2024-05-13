import { Navigate, Route, useParams, useLocation } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../Loading/Loading";

const ProtectedRoute = ({ accessType, reject, component }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    console.log("protected trigger");
    async function checkAccess() {
      try {
        let params = { accessType: accessType };

        if (accessType === "viewPost") {
          params = { ...params, postId: postId };
          // need to check if post can be viewed by target
        } else if (accessType === "editPost") {
          // need to check if post is same person or admin
          params = { ...params, postId: postId };
        } else if (accessType === "admin") {
          // need to check if userrole is admin
          params = { ...params };
        } else if (accessType === "createPost") {
          // need to check if has perms
        }

        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/blog/access`,
          {
            params: params,
            withCredentials: true,
          }
        );
        setAuthenticated(response.data.check);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    checkAccess();
  }, []);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div>{authenticated ? component : <Navigate to={reject} />}</div>
    </>
  );
};

export default ProtectedRoute;
