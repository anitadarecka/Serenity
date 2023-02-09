import React from "react";
import api from "@services/api";
import ManageSurgeryButton from "./ManageSurgeryButton";
import "./patientintervention.css";
import "../../Tailwind.css";
import InterventionRow from "./InterventionRow";

function PatientIntervention() {
  const [date, setDate] = React.useState([]);
  React.useEffect(() => {
    api
      .get("/surgeries/search/timeDate", {
        withCredentials: true,
      })
      .then((res) => setDate(res.data));
  }, []);

  return (
    <div className="w-10/12 pb-10">
      <ManageSurgeryButton />
      {date.map((d) => {
        return <InterventionRow date={d} id={d.id} />;
      })}
    </div>
  );
}

export default PatientIntervention;
