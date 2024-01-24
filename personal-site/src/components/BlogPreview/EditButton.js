import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./EditButton.module.css";
import { forwardRef, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";

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

const EditButton = ({ username }) => {
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
          <Dropdown.Item disabled={!enabled} href="#/action-1">
            Edit Post
          </Dropdown.Item>
          <Dropdown.Item disabled={!enabled} href="#/action-2">
            Delete Post
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EditButton;
