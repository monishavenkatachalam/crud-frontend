import { useState } from "react";
import { addUser } from "../services/userService";

export default function UserForm() {
  const [user, setUser] = useState({ name: "", email: "", location: "" });

  const handleSubmit = async () => {
    await addUser(user);
    alert("User Added!");
    window.location.reload();
  };

  return (
    <div className="card p-3">
      <input className="form-control mb-2" placeholder="Name" onChange={(e)=>setUser({...user,name:e.target.value})}/>
      <input className="form-control mb-2" placeholder="Email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
      <input className="form-control mb-2" placeholder="Location" onChange={(e)=>setUser({...user,location:e.target.value})}/>
      <button className="btn btn-primary" onClick={handleSubmit}>Add User</button>
    </div>
  );
}
