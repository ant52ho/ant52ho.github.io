import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import parse from "html-react-parser";
import styles from "./BlogPost.module.css";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import { Button } from "react-bootstrap";

const BlogPost = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    username: "",
  });
  const { postId } = useParams();
  const [error, setError] = useState({
    reason: "",
    name: "Error in loading requested resource",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/blog/post`,
          {
            withCredentials: true,
            params: {
              postId: postId,
            },
          }
        );
        // console.log(response.data.post.content);
        const result = response.data.post;

        // formatting
        const dateObject = new Date(result.createdAt);
        const updatedObject = new Date(result.updatedAt);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
          // Other formatting options as needed
        };
        const formattedDate = dateObject.toLocaleDateString("en-US", options);
        const formattedUpdate = updatedObject.toLocaleDateString(
          "en-US",
          options
        );
        // console.log(formattedDate);
        result.createdAt = formattedDate;
        result.updatedAt = formattedUpdate;
        setData(result); // title, content, createdAt, updatedAt, createdAt, username
      } catch (err) {
        console.log(err.message);
        if (err && err instanceof AxiosError) {
          setError({ name: err.message, reason: err.response?.data.message });
          if (err.response?.status == 401) {
            // auth error
            navigate("/blog/posts");
          }
        } else if (err && err instanceof Error) {
          setError({ ...error, reason: err.message });
        }
        console.log("Error: ", err);
        return;
      }
    }

    getPost();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-start flex-column"
        style={{
          paddingTop: "60px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            // minWidth: "100%",
            width: "100%",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => navigate("/blog/posts")}
            variant="light border-bottom"
            className="mt-3"
          >
            Return to posts
          </Button>
          {error.reason == "" ? (
            <>
              <h1 className="display-4 pt-4 pb-2">{data.title}</h1>
              <p className="m-0">
                <small>{data.createdAt}</small>
              </p>
              {data.createdAt != data.updatedAt ? (
                <p>
                  <small>Updated {data.updatedAt}</small>
                </p>
              ) : null}

              <p className="m-0">
                <small>Written by: {data.username}</small>
              </p>
              <div className={styles.post + " pt-4"}>{parse(data.content)}</div>
            </>
          ) : (
            <>
              <h1 className="display-4 pt-4 pb-2">{error.name}</h1>
              <p className="m-0">
                <small>Reason: {error.reason}</small>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
