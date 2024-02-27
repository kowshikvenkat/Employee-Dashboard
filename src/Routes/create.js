import React from 'react'
import axios from 'axios'
import Status from './status'
function Create() {
const[name,setName] = React.useState("")
const[age,setAge] = React.useState(0)
const[address , setAddress] = React.useState("")
const[joiningDate,setJoiningDate] = React.useState("")
const[role,setRole] = React.useState("")
const[showStatus, setShowStatus] = React.useState(false)
const[status,setStatus] = React.useState("")
async function HandleSubmit(e){
    e.preventDefault()
await axios.post("http://localhost:5000/createUser",{
    name:name,
    age:age,
    address:address,
    joiningDate:joiningDate,
    role:role
}).then((res)=>{
    setStatus(res.data)

}).catch((err)=>{
 setStatus(err.response.data);
})
      
       setShowStatus(true);
       setName("");
       setAge(0);
       setAddress("");
       setJoiningDate("");
       setRole("");
       setTimeout(() => {
         setShowStatus(false);
       }, 5000); 
}
  return (
    <div className="p-3 border border-dark">
      <h3>ENTER NEW EMPLOYEE DETAILS</h3>
      {showStatus && <Status status={status}/>}
      <form onSubmit={HandleSubmit}>
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
            value={age ? age:""}
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
        <input type="submit" className="btn btn-primary m-1" value="CREATE" />
      </form>
    </div>
  );
}

export default Create
