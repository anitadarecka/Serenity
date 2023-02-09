import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "@services/api";
import AddPatientInput from "./AddPatientInput";
import { useAuth } from "../../contexts/AuthContext";
import inputArray from "./utils_input";
import "../../Tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function AddPatient() {
  const { oneDoctor } = useAuth();
  const [selectedSurgery, setSelectedSurgery] = useState("");
  const [surgeriesList, SetSurgeriesList] = useState([]);
  const [addNewPatient, setAddNewPatient] = useState({
    lastname: null,
    firstname: null,
    mail: null,
    place: null,
    birth: null,
    phone: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/patients";
    if (
      addNewPatient.lastname === null &&
      addNewPatient.firstname === null &&
      addNewPatient.mail === null &&
      addNewPatient.place === null &&
      addNewPatient.birth === null &&
      addNewPatient.phone === null
    ) {
      toast.error("Il manque des données 😩", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    } else {
      api
        .post(url, {
          lastname: addNewPatient.lastname,
          firstname: addNewPatient.firstname,
          email: addNewPatient.mail,
          birth_place: addNewPatient.place,
          birth_date: addNewPatient.birth,
          mobile: addNewPatient.phone,
          image: `${
            import.meta.env.VITE_BACKEND_URL
          }/uploads/avatar-undefined.png`,
        })
        .then((res) => {
          if (res.status === 201) {
            const { patientId } = res.data;
            const surgeryId = selectedSurgery;
            const doctordId = oneDoctor.id;
            const url2 = "/surgeries/newPatient";
            const url3 = `/patients/addRessourcesBySurgery/${surgeryId}`;
            const url4 = "/patients//addDocumentsByPatient";
            const data2 = {
              patient_id: patientId,
              surgery_id: surgeryId,
              doctor_id: doctordId,
              date: "2023-02-12",
              time: "08:45:00",
              Bloc: "BLOC 1B",
            };
            const data3 = {
              patient_id: patientId,
              surgery_id: surgeryId,
            };
            const data4 = { patient_id: patientId };
            api
              .post(url2, data2)
              .then((response) => {
                toast.success(response.data.message, {
                  position: "top-center",
                  theme: "colored",
                  autoClose: 2000,
                });
                setSelectedSurgery("");
              })
              .catch((err) =>
                toast.error(err.response.data.message, {
                  position: "top-center",
                  theme: "colored",
                  autoClose: 2000,
                })
              );
            api
              .post(url3, data3)
              .then((response) => response)
              .catch((err) => console.error(err));
            api
              .post(url4, data4)
              .then((response) => response)
              .catch((err) => console.error(err));
          }
          setAddNewPatient({
            lastname: null,
            firstname: null,
            mail: null,
            place: null,
            birth: null,
            phone: null,
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const getAllSurgeries = () => {
    const url = "/surgeries";
    api.get(url).then((response) => SetSurgeriesList(response.data));
  };
  useEffect(() => {
    getAllSurgeries();
  }, []);

  const handleChange = (event) => {
    setSelectedSurgery(event.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-10/12 m-auto mt-10 p-10 shadow-[-6px_14px_15px_0px_#000000] text-white rounded-2xl"
    >
      <div className="text-white flex justify-center items-center mb-5">
        <select
          id="chirurgies_select"
          value={selectedSurgery || ""}
          onChange={handleChange}
          className="w-[35%] h-8 valid:outline-none rounded-md border-2 border-background-dark bg-input-dark bg-opacity-10 hover:border-violet-two hover:opacity-100 hover:bg-background-dark"
        >
          <option value="">--- 🫀 Choisir la chirurgie 🫁 ---</option>
          {surgeriesList.map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-evenly items-center">
        {inputArray.map((element) => (
          <AddPatientInput
            name={element.name}
            id={element.id}
            value={addNewPatient[element.name] || ""}
            type={element.type}
            classNameInput={element.classNameInput}
            classNameDiv={element.classNameDiv}
            placeholder={element.placeholder}
            label={element.label}
            addNewPatient={addNewPatient}
            setAddNewPatient={setAddNewPatient}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-10 flex rounded-md w-20 h-8 text-white bg-violet-two items-center justify-center"
        >
          Valider
        </button>
        <ToastContainer />
      </div>
    </form>
  );
}

export default AddPatient;
