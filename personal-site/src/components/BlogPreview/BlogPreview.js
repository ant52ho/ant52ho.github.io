// this is the component for a basic blog post
import styles from "./BlogPreview.module.css";
import { useNavigate } from "react-router-dom";

function BlogPreview(props) {
  const { username, postId, title, content, createdAt, permissions } = props;
  const navigate = useNavigate();
  const dateObject = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return (
    <>
      <div
        className={"w-100 border rounded rounded-lg p-3 " + styles.hoverMove}
        onClick={() => navigate("/blog/post/" + postId)}
      >
        <h3>{title}</h3>
        <p className="lead m-0">Here is some text</p>
        <p className="m-0">
          <small>
            {formattedDate} by {username}
          </small>
        </p>
      </div>
    </>
  );
}

export default BlogPreview;
