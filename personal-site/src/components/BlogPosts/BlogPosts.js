import { useState, useEffect } from "react";
import axios from "axios";
import BlogPreview from "components/BlogPreview/BlogPreview";

const BlogPosts = () => {
  const [data, setData] = useState([]);
  const [access, setAccess] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:5000/api/v1/blog/previews",
        {
          withCredentials: true,
        }
      );
      setData(response.data.posts);
      setAccess(response.data.access);
    }

    getData();
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{
          paddingTop: "60px",
          paddingBottom: "40px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            minWidth: "100%",
            padding: "20px",
          }}
        >
          {data.map((previewData, i) => {
            return (
              <div key={i} className="pt-2">
                <BlogPreview {...previewData} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
