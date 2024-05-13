import axios, { AxiosError } from "axios";
import PostConfig from "components/PostConfig/PostConfig";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EditPost = () => {
  const navigate = useNavigate();
  const [defaultConfig, setDefaultConfig] = useState({
    defaultBody: "",
    defaultSelected: [], // must be in {value:, label:,} format
    defaultTitle: "",
    defaultSummary: "",
  });
  const { postId } = useParams();
  async function onSubmit(data) {
    async function updatePost(data) {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/blog/post`,
        { postId: postId, ...data },
        {
          withCredentials: true,
        }
      );
      return response;
    }

    const update = await updatePost(data);
    return update;
  }

  async function onDelete() {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/blog/post`,
      {
        withCredentials: true,
        params: {
          postId: postId,
        },
      }
    );

    navigate("/blog/posts");
    return response;
  }

  // get post data to populate editor
  useEffect(() => {
    async function getPost() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blog/post`,
        {
          withCredentials: true,
          params: {
            postId: postId,
          },
        }
      );
      const result = response.data.post;
      const config = {
        defaultBody: result.content,
        defaultSelected: result.userRoles,
        defaultTitle: result.title,
        defaultSummary: result.summary,
      };

      // console.log(config);
      setDefaultConfig(config);
    }

    getPost();
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{
          paddingTop: "60px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            minWidth: "100%",
            padding: "20px",
          }}
        >
          <h1 className="pb-2">Edit post</h1>
          <PostConfig
            onSubmit={onSubmit}
            onDelete={onDelete}
            defaultConfig={defaultConfig}
            clearOnSubmit={false}
            postId={postId}
          />
        </div>
      </div>
    </>
  );
};

export default EditPost;
