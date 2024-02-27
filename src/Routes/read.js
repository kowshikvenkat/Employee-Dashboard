import React from 'react'
import axios from 'axios';

function Read() {

    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [showData,setShowData] = React.useState(false)
    const[data,setData] = React.useState([])
    async function HandleSubmit(e){
        e.preventDefault();
        await axios.post("http://localhost:5000/find",{
            name:name,
            address:address
        }).then((res)=>{
setData(res.data.docs)
        }).catch((err)=>{
          
        })
        setShowData(true)
    }
  return (
    <div className="p-3 border border-dark">
      <h3>ENTER EMPLOYEE DETAILS</h3>
      <form onSubmit={HandleSubmit}>
        <div className="form-group w-50  d-flex flex-column align-items-start">
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
        <input type="submit" className="btn btn-primary m-1" value="SEARCH" />
      </form>
      {showData && (
        <div>
          {data.length > 0
            ? data.map((item, index) => (
                <div className='border border-dark'>
                  <p>NAME : {item.name}</p>
                  <p>AGE : {item.age}</p>
                  <p>ADDRESS : {item.address}</p>
                  <p>JOINING DATE : {item.joining_date}</p>
                  <p>ROLE : {item.role}</p>
             
                </div>
              ))
            : "NO RECORD FOUND"}
        </div>
      )}
    </div>
  );
}

export default Read
