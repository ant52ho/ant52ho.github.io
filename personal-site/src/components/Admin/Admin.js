import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import ButtonRenderer from "./ButtonRenderer";
import ExpandedCard from "./ExpandedCard";
import { useAuthHeader } from "react-auth-kit";

function Admin() {
  const gridRef = useRef();
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [registrationData, setregistrationData] = useState([]);
  const [showExpand, setShowExpand] = useState(false);
  const [info, setInfo] = useState([]);
  const authHeader = useAuthHeader();

  const getRegistrations = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/registrations`, {
        headers: {
          Authorization: authHeader(),
        },
      })
      .catch((err) => {
        console.log("Error", err);
      });
    setregistrationData(response.data);
    // console.log("Response: ", response);
  };

  useEffect(() => {
    getRegistrations();
  }, []);

  const onGridReady = useCallback((params) => {
    gridRef.current = params;
  }, []);

  const onCellClicked = (e) => {
    if (e.column.colId !== "Decision") {
      setShowExpand(true);
      console.log(e.data);
      setInfo(e.data);
    }
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "username", width: 150 },
    { field: "email", width: 150 },
    { field: "reason", flex: 1, minWidth: 150 },
    {
      field: "Decision",
      minWidth: 190,
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        setMsg: setMsg,
        setSuccess: setSuccess,
        setShowAlert: setShowAlert,
        getRegistrations: getRegistrations,
      },
    },
  ]);
  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <ExpandedCard
          setShowExpand={setShowExpand}
          showExpand={showExpand}
          {...info}
        />
        <div className="w-100">
          {showAlert ? (
            <Row>
              <div className="px-5">
                <Alert
                  variant={success ? "success" : "danger"}
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  <Alert.Heading>
                    {success ? "Success" : "Warning"}
                  </Alert.Heading>
                  <p>{msg}</p>
                </Alert>
              </div>
            </Row>
          ) : null}
          <Row className="d-flex align-items-center justify-content-center">
            <div
              className="ag-theme-quartz"
              style={{
                height: 500,
                width: "100%",
                padding: 20,
                margin: 0,
              }}
            >
              {/* The AG Grid component */}
              <AgGridReact
                rowData={registrationData}
                columnDefs={colDefs}
                rowSelection={"single"}
                // onSelectionChanged={onSelectionChanged}
                onGridReady={onGridReady}
                onCellClicked={onCellClicked}
              />
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Admin;
