import React, { useEffect, useState } from "react";
import api from "@services/api";
import { useAuth } from "../../contexts/AuthContext";
import "../../Tailwind.css";

function Calendar() {
  // const month = today.toLocaleString("default", { month: "long" });

  const [getSurgeryData, setGetSurgeryData] = useState([]);
  const [textColor, setTextColor] = useState({ color: "" });
  const { onePatient, role } = useAuth();

  const getData = () => {
    const url = `/surgeries/byPatient/${onePatient.id}`;
    api.get(url, { withCredentials: true }).then((response) => {
      setGetSurgeryData(response.data);
    });
  };

  useEffect(() => {
    if (onePatient.id !== undefined) {
      getData();
    }
  }, [onePatient]);

  useEffect(() => {
    if (role === 1) {
      setTextColor({ color: "text-white font-bold text-lg w-[20vw]" });
    } else {
      setTextColor({ color: "text-black font-bold text-[18px] w-[20vw]" });
    }
  }, [role]);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatDate = new Date(getSurgeryData.date).toLocaleDateString(
    "fr-Fr",
    options
  );
  const today = new Date();
  const date = new Date(getSurgeryData.date);
  const diffTime = Math.abs(date - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex w-[30vw] gap-3 items-center">
      <div className="rounded-[15px] bg-[#FFEBF6] w-[80px] h-[80px] flex flex-col justify-center items-center text-lg">
        <p className="text-black text-xl font-bold">J - {diffDays}</p>
      </div>
      {getSurgeryData.date && (
        <div className="text-white flex flex-col h-[80px]">
          <span className={textColor.color}> {getSurgeryData.name}</span>
          <span className="text-[15px] text-font-gray">{formatDate}</span>
          <span className="bg-violet-two mt-1 rounded-[8px] w-24 flex justify-center items-center">
            {getSurgeryData.time.slice(0, 5)}
          </span>
        </div>
      )}
    </div>
  );
}

export default Calendar;
