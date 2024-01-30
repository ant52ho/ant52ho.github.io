import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./EditButton.module.css";
import { forwardRef, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <>
    <Button
      variant="light"
      className={styles.dots}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <BsThreeDotsVertical />
    </Button>
  </>
));

const EditButton = ({ username, postId }) => {
  const navigate = useNavigate();
  const getHeader = useAuthHeader();
  const [enabled, setEnabled] = useState(false);

  // const userInfo = jwtDecode(useAuthHeader());
  useEffect(() => {
    const userInfo = getHeader()
      ? jwtDecode(getHeader())
      : { username: "guest", userRole: "guest" };
    console.log(userInfo);
    setEnabled(userInfo.username === username || userInfo.userRole === "admin");
  }, []);

  async function onDelete(e) {
    console.log("Deleting post " + postId);
    async function deletePost() {
      const response = await axios.delete(
        "http://localhost:5000/api/v1/blog/post",
        {
          withCredentials: true,
          params: {
            postId: postId,
          },
        }
      );
      return response;
    }

    const res = await deletePost(postId);
    return res;
  }

  return (
    <>
      <Dropdown
        drop="start"
        // align="end"
        style={{}}
      >
        <Dropdown.Toggle
          as={CustomToggle}
          id="dropdown-custom-components"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            disabled={!enabled}
            onClick={() => navigate("/blog/edit/" + postId)}
          >
            Edit Post
          </Dropdown.Item>
          <Dropdown.Item disabled={!enabled} onClick={() => onDelete()}>
            Delete Post
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EditButton;
