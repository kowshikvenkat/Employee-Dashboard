import React from "react";
import axios from "axios";
import Status from "./status";
function Update() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [joiningDate, setJoiningDate] = React.useState("");
  const [role, setRole] = React.useState("");
  const [showData, setShowData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [id, setId] = React.useState("");
  const [shouldUpdate, setShouldUpdate] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [status, setStatus] = React.useState("");
  async function VerifyRecords(e) {
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
  function HandleUpdate(id) {
    setId(id["_id"]);
    setName(id.name);
    setAge(id.age);
    setAddress(id.address);
    setJoiningDate(id.joining_date);
    setRole(id.role);
    setShouldUpdate(true);
  }
  async function UpdateRecords(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/updateUser", {
        id: id,
        name: name,
        age: age,
        address: address,
        joiningDate: joiningDate,
        role: role,
      })
      .then((res) => {
        setStatus(res.data);
     
      })
      .catch((err) => {
        setStatus(err.response.data);      
      });
         setShowStatus(true);
         setShowData(false);
         setData([]);
         setName("");
         setAge(0);
         setAddress("");
         setJoiningDate("");
         setRole("");
         setTimeout(() => {
           setShowStatus(false);
           setShouldUpdate(false);
         }, 3000);
  }
  return (
    <div className="p-3 border border-dark">
      <h3>UPDATE EMPLOYEE RECORD</h3>

      {shouldUpdate ? (
        <form onSubmit={UpdateRecords}>
          {showStatus && <Status status={status} />}
          <div className="form-group w-50  d-flex flex-column align-items-start">
            <label htmlFor="name">Employee Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Employee Name"
              minLength={5}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group w-25  d-flex flex-column align-items-start">
            <label htmlFor="name">Age</label>
            <input
              className="form-control"
              type="number"
              id="name"
              placeholder="age"
              min={18}
              value={age ? age : ""}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group w-50  d-flex flex-column align-items-start">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              className="form-control"
              placeholder="Address"
              cols="30"
              rows="5"
              minLength={10}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group w-25  d-flex flex-column align-items-start">
            <label htmlFor="date">Joining Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group w-25  d-flex flex-column align-items-start">
            <label htmlFor="role">Job Role</label>
            <select
              name=""
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled hidden selected>
                Choose an option
              </option>
              <option value="Executive">Executive</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <input type="submit" className="btn btn-primary m-1" value="UPDATE" />
        </form>
      ) : (
        <>
          <form onSubmit={VerifyRecords}>
            <div className="form-group w-50  d-flex flex-column align-items-start">
              <h5>SEARCH EMPLOYEE</h5>
              <label htmlFor="name">Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Employee Name"
                minLength={5}
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
                onChange={(e) => setAddress(e.target.value)}
                required={name.length === 0}
              ></textarea>
            </div>
            <input
              type="submit"
              className="btn btn-primary m-1"
              value="SEARCH"
            />
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
                        className="btn btn-warning m-3"
                        onClick={() => HandleUpdate(item)}
                      >
                        UPDATE
                      </button>
                    </div>
                  ))
                : "NO RECORD FOUND"}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Update;
