import React, { useEffect, useState } from "react";
import api from "@services/api";
import { useAuth } from "../../contexts/AuthContext";

function ButtonChecklist() {
  const { onePatient, role, setRefresh, refresh } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [docChecked, setDocChecked] = useState({
    checked: false,
    id: null,
  });

  const getDocuments = () => {
    api
      .get(`/documents/patient/${onePatient.id}`, {
        withCredentials: true,
      })
      .then((document) => {
        setDocuments(document.data);
      });
  };

  const handleChange = (e) => {
    setDocChecked([{ [e.target.name]: e.target.checked }, { id: e.target.id }]);
  };

  useEffect(() => {
    if (docChecked.id !== null) {
      const url = `/documents/patient/${onePatient.id}/document/${docChecked[1].id}`;
      api.put(url, docChecked[0]).then((res) => {
        console.warn(res);
      });
      setRefresh(!refresh);
    }
  }, [docChecked]);

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-1 mb-5">
      {documents &&
        documents.map((document) => (
          <div className="flex flex-wrap w-1/4">
            <div
              className={`shadow-lg rounded-lg h-20 w-full flex mt-5 ${
                role === 1
                  ? "bg-[#414551] text-white"
                  : "bg-white text-font-dark3"
              }`}
            >
              <input
                className="ml-5 w-5"
                type="checkbox"
                defaultChecked={document.checked}
                onChange={handleChange}
                name="checked"
                id={document.document_id}
              />
              <div className="flex flex-col justify-center ml-5">
                <h4>
                  {document.type}
                  <span className="text-font-red font-semibold">
                    {document.mandatory === 1 && " *"}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        ))}
      {role === 1 && (
        <div className="flex flex-wrap w-1/4">
          <div
            className={`shadow-lg rounded-lg h-20 w-full flex mt-5 justify-center items-center cursor-pointer ${
              role === 1
                ? "bg-[#414551] text-white"
                : "bg-white text-font-dark3"
            }`}
          >
            <div className="flex flex-col justify-center">
              <h4 className="text-background-ligthy text-4xl">+</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonChecklist;
