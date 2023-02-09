import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "@services/api";
import { useAuth } from "../../contexts/AuthContext";

import NewInputArray from "./new_utils_imput";

function ManageSurgery() {
  const { oneDoctor } = useAuth();
  const [surgeryByDoctor, setSurgeryByDoctor] = useState([]);
  const [selectedSurgeryByDoctor, setSelectedSurgeryByDoctor] = useState("");
  const [updateSurgery, setUpdateSurgery] = useState({
    name: null,
    type: null,
    description: null,
  });
  const [addNewSurgery, setAddNewSurgery] = useState({
    name: null,
    type: null,
    description: null,
  });
  const handleChange = (e) => {
    if (selectedSurgeryByDoctor === "") {
      setAddNewSurgery({
        ...addNewSurgery,
        [e.target.name]: e.target.value,
      });
    } else {
      setUpdateSurgery({
        ...updateSurgery,
        [e.target.name]: e.target.value,
      });
    }
  };
  const getSurgeryByDoctor = () => {
    const url = `/surgeries/doctorSurgeries/${oneDoctor.id}`;
    api.get(url).then((response) => setSurgeryByDoctor(response.data));
  };
  useEffect(() => {
    getSurgeryByDoctor();
  }, [oneDoctor]);
  const handleSelect = (event) => {
    setSelectedSurgeryByDoctor(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSurgeryByDoctor === "") {
      const url = "/surgeries";
      if (
        addNewSurgery.name === null &&
        addNewSurgery.type === null &&
        addNewSurgery.description === null
      ) {
        toast.error("Il manque des données 😩", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        api
          .post(url, {
            name: addNewSurgery.name,
            type: addNewSurgery.type,
            description: addNewSurgery.description,
          })
          .then((response) => {
            toast.success(response.data.message, {
              position: "top-center",
              theme: "colored",
              autoClose: 2000,
            });
          })
          .catch((err) =>
            toast.error(err.response.data.message, {
              position: "top-center",
              theme: "colored",
              autoClose: 2000,
            })
          );
        setAddNewSurgery({
          name: null,
          type: null,
          description: null,
        });
      }
    } else {
      const url = `/surgeries/${selectedSurgeryByDoctor}`;
      api
        .put(url, {
          name:
            updateSurgery.name ||
            surgeryByDoctor.find((el) => el.name === selectedSurgeryByDoctor)
              .name,
          type:
            updateSurgery.type ||
            surgeryByDoctor.find((el) => el.name === selectedSurgeryByDoctor)
              .type,
          description:
            updateSurgery.description ||
            surgeryByDoctor.find((el) => el.name === selectedSurgeryByDoctor)
              .description,
        })
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
          });
        })
        .catch((err) =>
          toast.error(err.response.data.message, {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
          })
        );
      setSelectedSurgeryByDoctor("");
      setUpdateSurgery({
        name: null,
        type: null,
        description: null,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-10/12 m-auto mt-10 p-10 shadow-[-6px_14px_15px_0px_#000000] text-white rounded-2xl"
    >
      <select
        className="w-[45%] h-8 pl-3 valid:outline-none rounded-md border-2 border-background-dark bg-input-dark bg-opacity-10 hover:border-violet-two hover:opacity-100 hover:bg-background-dark"
        onChange={handleSelect}
        id="doctor_surgery"
      >
        <option value="">Ajouter ou modifier</option>
        {surgeryByDoctor.map((element) => (
          <option key={element.id} value={element.name}>
            {element.name}
          </option>
        ))}
      </select>
      <div className="flex flex-wrap justify-between items-center">
        {NewInputArray.map((element) => (
          <div key={element.id} className={element.classNameDiv}>
            <label className="ml-1" htmlFor={element.name}>
              {element.label}
            </label>
            <input
              id={element.bla}
              type={element.type}
              className={element.classNameInput}
              placeholder={element.placeholder}
              name={element.name}
              onChange={handleChange}
              defaultValue={
                (surgeryByDoctor.length > 0 &&
                  selectedSurgeryByDoctor !== "" &&
                  surgeryByDoctor.find(
                    (el) => el.name === selectedSurgeryByDoctor
                  )[element.name]) ||
                ""
              }
            />
          </div>
        ))}
        <div className="w-[100%] flex flex-col mt-3">
          <label className="ml-1" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            className="mt-1 pt-1 pb-[12vh] pl-3 valid:outline-none placeholder:italic h-[20vh] w-full rounded-md border-2 border-background-dark bg-input-dark bg-opacity-10 hover:border-violet-two hover:opacity-100 hover:bg-background-dark"
            onChange={handleChange}
            defaultValue={
              (surgeryByDoctor.length > 0 &&
                selectedSurgeryByDoctor !== "" &&
                surgeryByDoctor.find(
                  (el) => el.name === selectedSurgeryByDoctor
                ).description) ||
              ""
            }
          />
        </div>
        <div className="ml-[40%]">
          <button
            type="submit"
            className="mt-10 flex rounded-md w-fit p-5 h-8 text-white bg-violet-two items-center "
          >
            {selectedSurgeryByDoctor === "" ? "Ajouter" : "Modifier"}
          </button>
          <ToastContainer />
        </div>
      </div>
    </form>
  );
}

export default ManageSurgery;
