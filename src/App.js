import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Analytics from "./components/Analytics";

export default function App() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">CRUD Application</h2>
      <UserForm />
      <UserList />
      <Analytics />
    </div>
  );
}
