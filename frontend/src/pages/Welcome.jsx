import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { useAuth } from "../contexts/AuthContext";

function Welcome() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    api
      .get("/users/", {
        withCredentials: true,
      })
      .then((res) => {
        setPatient(res.data[0]);
      })

      .catch(() => {
        navigate("/");
      });
  }, []);
  const handleLogout = () => {
    api
      .get("/users/logout", {
        withCredentials: true,
      })
      .then(() => {
        logout();
      });
  };
  return (
    <div className="absolute right-0 w-10/12 p-60 flex flex-col items-center">
      Welcome {patient.firstname} {patient.lastname}!
      <div>
        <input
          className="bg-violet-three hover:bg-violet-two transition-all text-white w-full py-2 px-3 my-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          value="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Welcome;
