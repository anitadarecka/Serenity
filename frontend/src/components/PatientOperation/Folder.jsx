import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "@services/api";
import Check from "./assets/dossier-operation-fait.png";
import NotCheck from "./assets/dossier-operation-a-lire.png";
import DossierDoctor from "./assets/dossier-operation-doc.png";

function Folder({ id, image, role, setRefresh, refresh }) {
  const [folder, setFolder] = useState();
  const [document, setDocument] = useState(true);

  useEffect(() => {
    if (role === 1) {
      setFolder(DossierDoctor);
    } else {
      setFolder(NotCheck);
    }
  }, [role]);

  const handleClick = () => {
    if (role === 2) {
      setFolder(Check);
    }
    setDocument(!document);
  };

  const deleteDossier = () => {
    api
      .delete(`/ressources/byRelation/${id}`, {
        withCredentials: true,
      })
      .then((res) => res);
    setRefresh(!refresh);
  };

  return (
    <div className="relative">
      {role === 1 && (
        <div
          className="absolute w-[30px] h-[30px] bg-font-red right-1 top-2 rounded-full z-50 text-white flex items-center justify-center font-black text-md cursor-pointer"
          role="presentation"
          onClick={deleteDossier}
        >
          &#x2715;
        </div>
      )}
      <img
        src={
          document
            ? folder
            : `${import.meta.env.VITE_BACKEND_URL}/SurgeryRessource/${image}`
        }
        role="presentation"
        className={`w-36 cursor-pointer transform transition duration-500 ${
          document
            ? "z-0"
            : "relative hover:scale-[5] hover:-translate-y-40 hover:translate-x-20 hover:z-50"
        }`}
        alt="Ressource"
        onClick={handleClick}
      />
    </div>
  );
}

Folder.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  role: PropTypes.number.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};

export default Folder;
