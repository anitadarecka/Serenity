import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import ButtonChecklist from "./ButtonChecklist";

function CheckList() {
  const { role } = useAuth();
  return (
    <div className="flex justify-center mb-8 mt-12">
      <div
        className={`border-4 border-violet-one rounded-2xl w-[90%] py-4 px-6 flex flex-col ${
          role === 1
            ? "bg-background-dark text-white"
            : "bg-background-lighty text-font-dark3"
        }`}
      >
        <h2>Ma check list avant mon départ pour la clinique</h2>
        <p className="text-font-red text-sm">* document obligatoire</p>
        <ButtonChecklist />
      </div>
    </div>
  );
}

export default CheckList;
