import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./EditButton.module.css";
import { forwardRef, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";
import ConfirmationCard from "components/ConfirmationCard/ConfirmationCard";

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
  const [enabled, setEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const authHeader = useAuthHeader();

  // const userInfo = jwtDecode(useAuthHeader());
  useEffect(() => {
    const userInfo = authHeader()
      ? jwtDecode(authHeader())
      : { username: "guest", userRole: "guest" };
    setEnabled(userInfo.username === username || userInfo.userRole === "admin");
  }, []);

  const onSelectDelete = () => {
    setShowDeleteConfirm(true);
  };

  async function onDelete(e) {
    console.log("Deleting post " + postId);
    async function deletePost() {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/blog/post`,
        {
          params: {
            postId: postId,
          },
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      return response;
    }

    const res = await deletePost(postId);
    navigate(0);
    return res;
  }

  return (
    <>
      <ConfirmationCard
        setShow={setShowDeleteConfirm}
        show={showDeleteConfirm}
        onConfirm={() => onDelete()}
        onDeny={() => {
          return;
        }}
        message="Are you sure you want to delete this post?"
      />
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
          <Dropdown.Item disabled={!enabled} onClick={() => onSelectDelete()}>
            Delete Post
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EditButton;
