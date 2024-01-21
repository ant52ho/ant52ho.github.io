import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import styles from "./BlogPost.module.css";
const BlogPost = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    username: "",
  });
  const { postId } = useParams();

  useEffect(() => {
    async function getPost() {
      const response = await axios.get(
        "http://localhost:5000/api/v1/blog/post",
        {
          withCredentials: true,
          params: {
            postId: postId,
          },
        }
      );
      console.log(response.data.post.content);
      const result = response.data.post;

      // formatting
      const dateObject = new Date(result.createdAt);
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
      console.log(formattedDate);
      result.createdAt = formattedDate;
      setData(result); // title, content, createdAt, updatedAt, username
    }

    getPost();
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
          <h1 className="display-4 pt-4 pb-2">{data.title}</h1>
          <p className="m-0">
            <small>{data.createdAt}</small>
          </p>
          <p className="m-0">
            <small>Written by: {data.username}</small>
          </p>
          <div className={styles.post + " pt-4"}>{parse(data.content)}</div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
