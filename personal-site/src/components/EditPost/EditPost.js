import axios, { AxiosError } from "axios";
import PostConfig from "components/PostConfig/PostConfig";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPost = () => {
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
        "http://localhost:5000/api/v1/blog/post",
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

  // get post data to populate editor
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
      const result = response.data.post;
      const config = {
        defaultBody: result.content,
        defaultSelected: result.userRoles,
        defaultTitle: result.title,
        defaultSummary: result.summary,
      };

      console.log(config);
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
            defaultConfig={defaultConfig}
            clearOnSubmit={false}
          />
        </div>
      </div>
    </>
  );
};

export default EditPost;
