import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "@services/api";
import { useAuth } from "../../contexts/AuthContext";
import Folder from "./Folder";

function FolderOperation() {
  const { onePatient, role } = useAuth();
  const [ressources, setRessources] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getRessources = () => {
    if (onePatient.id !== undefined) {
      api
        .get(`/surgeries/ressources/${onePatient.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setRessources(res.data, "ressource");
        });
    }
  };

  useEffect(() => {
    getRessources();
  }, [onePatient.id, refresh]);

  return (
    <div className=" flex px-4 mb-4">
      <div className="flex flex-wrap gap-x-6 gap-y-3 ">
        {ressources &&
          ressources.map((ressource) => (
            <Folder
              key={ressource.ress_id}
              id={ressource.ress_id}
              image={ressource.image}
              role={role}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ))}
        {role === 1 && (
          <div className="mt-2 flex flex-col w-36 gap-2 font-rubik ">
            <NavLink to="">
              <div className="flex justify-center items-center h-[105px] bg-[#636363] rounded-3xl text-5xl">
                +
              </div>
            </NavLink>
            <h3>Ajouter un dossier</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderOperation;
