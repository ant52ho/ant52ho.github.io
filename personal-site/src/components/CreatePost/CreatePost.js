import axios, { AxiosError } from "axios";
import PostConfig from "components/PostConfig/PostConfig";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
function CreatePost() {
  const navigate = useNavigate();
  const defaultConfig = {
    defaultBody: "",
    defaultSelected: [],
    defaultTitle: "",
    defaultSummary: "",
  };
  const authHeader = useAuthHeader();
  async function onSubmit(data) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/blog/create`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    );
    return response;
  }

  function onDelete() {
    navigate("/blog");
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
