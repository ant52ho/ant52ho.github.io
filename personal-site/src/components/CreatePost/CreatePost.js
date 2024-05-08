import axios, { AxiosError } from "axios";
import PostConfig from "components/PostConfig/PostConfig";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const navigate = useNavigate();
  const defaultConfig = {
    defaultBody: "",
    defaultSelected: [],
    defaultTitle: "",
    defaultSummary: "",
  };
  async function onSubmit(data) {
    const response = await axios.post(
      "http://localhost:5000/api/v1/blog/create",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  function onDelete() {
    navigate("/blog/posts");
  }
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
          <h1 className="pb-2">Create post</h1>
          <PostConfig
            onSubmit={onSubmit}
            onDelete={onDelete}
            defaultConfig={defaultConfig}
          />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
