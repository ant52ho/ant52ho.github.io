// this is the component for a basic blog post
import styles from "./BlogPreview.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditButton from "./EditButton";

function BlogPreview(props) {
  const { username, postId, title, content, createdAt, permissions, summary } =
    props;
  const navigate = useNavigate();
  const dateObject = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const formattedPermissions = permissions.replace(/,/g, ", ");
  return (
    <>
      <div
        className={
          "w-100 border rounded rounded-lg p-3 position-relative " +
          styles.hoverMove
        }
      >
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
        >
          <EditButton username={username} />
        </div>
        <div onClick={() => navigate("/blog/post/" + postId)}>
          <h4>{title}</h4>
          <p className="lead m-0">{summary}</p>
          <p className="m-0">
            <small>
              {formattedDate} by {username}
            </small>
          </p>
        </div>
      </div>
    </>
  );
}

export default BlogPreview;
