import React from 'react'
import './router.css'
import { useNavigate,useLocation } from "react-router-dom";
function Router() {
  const navigate = useNavigate()
  const location  = useLocation()
   const buttonStyle = {
     backgroundColor: "transparent",
     border:"none",
     outline: "none",
     margin:10,
   };
   const containerStyle = {
    display:"flex",
    justifyContent:"center",
   }
  return (
    <div>
      <div style={containerStyle}>
        <button
          style={{
            ...buttonStyle,
            color: location.pathname == "/" && "gold",
            textDecoration: location.pathname === "/" && "underline",
          }}
          onClick={() => navigate("/")}
        >
          <h4>Create New Employee Details &gt;</h4>
        </button>
        <button
          style={{
            ...buttonStyle,
            color: location.pathname == "/find" && "gold",
            textDecoration: location.pathname === "/find" && "underline",
          }}
          onClick={() => navigate("/find")}
        >
          <h4> Find Employee &gt;</h4>
        </button>
        <button
          style={{
            ...buttonStyle,
            color: location.pathname === "/update" && "gold",
            textDecoration: location.pathname === "/update" && "underline",
          }}
          onClick={() => navigate("/update")}
        >
          <h4> Update Employee Details&gt;</h4>
        </button>
        <button
          style={{
            ...buttonStyle,
            color: location.pathname == "/delete" && "gold",
            textDecoration: location.pathname === "/delete" && "underline",
          }}
          onClick={() => navigate("/delete")}
        >
          <h4> Delete Employee Details &gt;</h4>
        </button>
      </div>
    </div>
  );
}

export default Router
