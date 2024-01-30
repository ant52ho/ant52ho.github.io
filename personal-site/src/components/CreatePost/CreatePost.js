import axios, { AxiosError } from "axios";
import PostConfig from "components/PostConfig/PostConfig";

function CreatePost() {
  async function onSubmit(data) {
    const response = await axios.post(
      "http://localhost:5000/api/v1/create-post",
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
          <PostConfig onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
