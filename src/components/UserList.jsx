import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../services/userService";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", email: "", location: "" });

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await deleteUser(id);
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedData({ name: user.name, email: user.email, location: user.location });
  };

  const handleUpdate = async () => {
    await updateUser(editingUser, updatedData);
    alert("User Updated Successfully!");
    setEditingUser(null);
    loadUsers();
  };

  return (
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {editingUser === user.id ? (
                <input
                  className="form-control"
                  value={updatedData.name}
                  onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                />
              ) : (
                user.name
              )}
            </td>

            <td>
              {editingUser === user.id ? (
                <input
                  className="form-control"
                  value={updatedData.email}
                  onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                />
              ) : (
                user.email
              )}
            </td>

            <td>
              {editingUser === user.id ? (
                <input
                  className="form-control"
                  value={updatedData.location}
                  onChange={(e) => setUpdatedData({ ...updatedData, location: e.target.value })}
                />
              ) : (
                user.location
              )}
            </td>

            <td>
              {editingUser === user.id ? (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
