import { useState, useEffect } from "react";
import axios from "axios";
import BlogPreview from "components/BlogPreview/BlogPreview";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const BlogPosts = () => {
  const [data, setData] = useState([]);
  const [access, setAccess] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const defaultSort = "descending";

  const sortData = (value, data) => {
    let sortedData;
    if (value == "ascending") {
      sortedData = [...data].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (value == "descending") {
      sortedData = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return sortedData;
  };

  // returns true if an overlap exists between the input array
  //   and the selected options
  const overlapSelected = (entry) => {
    const selected = selectedOptions.map((i) => i.value);
    const postPerms = entry.permissions.split(",");
    for (let j = 0; j < postPerms.length; j++) {
      if (selected.includes(postPerms[j])) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/blog/previews`,
        {
          withCredentials: true,
        }
      );

      const sortedData = sortData(defaultSort, response.data.posts);
      setData(sortedData);

      const res = response.data.access.map((item) => {
        // turns list into {value, label}
        return {
          value: item,
          label: item.charAt(0).toUpperCase() + item.slice(1),
        };
      });
      setAccess(res);
      setSelectedOptions(res);
    }

    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-start flex-column"
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
          <div className="d-flex flex-row w-100">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => setData(sortData(event.target.value, data))}
              defaultValue={defaultSort}
              style={{
                width: "40%",
                maxWidth: "300px",
                marginRight: "20px",
              }}
            >
              <option disabled>Sort by </option>
              <option value="descending">Descending</option>
              <option value="ascending">Ascending</option>
            </Form.Select>
            <div
              style={{
                width: "40%",
                maxWidth: "300px",
              }}
            >
              <Select
                className="w-100"
                options={access}
                isMulti
                value={selectedOptions}
                onChange={(value) => {
                  setSelectedOptions(value);
                }}
                placeholder="Visible to"
              />
            </div>
          </div>

          {data.map((previewData, i) => {
            if (overlapSelected(previewData)) {
              // if (true) {
              // budget filter
              return (
                <div key={i} className="pt-2">
                  <BlogPreview {...previewData} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
