import React from "react";
import axios from "axios";
import Status from "./status";
function Delete() {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [showData, setShowData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [showStatus, setShowStatus] = React.useState(false);
  const [status, setStatus] = React.useState("");
  async function HandleSubmit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/find", {
        name: name,
        address: address,
      })
      .then((res) => {
        setData(res.data.docs);
      })
      .catch((err) => {});
    setShowData(true);
  }
  async function HandleDelete(id) {
    await axios
      .post("http://localhost:5000/deleteUser", {
        id: id,
      })
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus(err.response.data);
      });
    setShowData(false);
    setShowStatus(true);
    setName("");
    setAddress("");
    setTimeout(() => {
      setShowStatus(false);
    }, 5000);
  }
  return (
    <div className="p-3 border border-dark">
      <h3>DELETE EMPLOYEE RECORD</h3>
      {showStatus && <Status status={status} />}
      <form onSubmit={HandleSubmit}>
        <div className="form-group w-50  d-flex flex-column align-items-start">
          <h5>SEARCH EMPLOYEE </h5>
          <label htmlFor="name">Employee Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Employee Name"
            minLength={5}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={address.length === 0}
          />
        </div>
        <div className="form-group w-50  d-flex flex-column align-items-start">
          <label htmlFor="address">Employee Address</label>
          <textarea
            id="address"
            className="form-control"
            placeholder="Address"
            cols="30"
            rows="5"
            minLength={10}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required={name.length === 0}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary m-1" value="SEARCH" />
      </form>
      {showData && (
        <div>
          {data.length > 0
            ? data.map((item, index) => (
                <div className="border border-dark">
                  <p>NAME : {item.name}</p>
                  <p>AGE : {item.age}</p>
                  <p>ADDRESS : {item.address}</p>
                  <p>JOINING DATE : {item.joining_date}</p>
                  <p>ROLE : {item.role}</p>
                  <button
                    className="btn btn-danger m-3"
                    onClick={() => HandleDelete(item["_id"])}
                  >
                    DELETE
                  </button>
                </div>
              ))
            : "NO RECORD FOUND"}
        </div>
      )}
    </div>
  );
}

export default Delete;
