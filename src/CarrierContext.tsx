import { createContext, useState, useContext, type ReactNode } from "react";

export interface Career {
  name: string;
  about: string;
  match: number;
  missing: string[];
}

interface CareerContextType {
  results: Career[];
  message: string;
  name: string;
  education: string;
  intrest: string;
  experience: string;
  skills: string;
  saveGuidance: (message: string, results: Career[]) => void;
  saveProfile: (
    name: string,
    education: string,
    intrest: string,
    experience: string,
    skills: string,
  ) => void;
}

const CareerContext = createContext<CareerContextType>({
  results: [],
  message: "",
  name: "",
  education: "",
  intrest: "",
  experience: "",
  skills: "",
  saveGuidance: () => {},
  saveProfile: () => {},
});

export function CareerProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<Career[]>(
    JSON.parse(localStorage.getItem("results") || "[]"),
  );
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [education, setEducation] = useState(
    localStorage.getItem("education") || "",
  );
  const [intrest, setIntrest] = useState(localStorage.getItem("intrest") || "");
  const [experience, setExperience] = useState(
    localStorage.getItem("experience") || "",
  );
  const [skills, setSkills] = useState(localStorage.getItem("skills") || "");

  const saveGuidance = (msg: string, data: Career[]) => {
    setMessage(msg);
    setResults(data);
    localStorage.setItem("message", msg);
    localStorage.setItem("results", JSON.stringify(data));
  };

  const saveProfile = (
    studentName: string,
    studentEducation: string,
    studentIntrest: string,
    studentExperience: string,
    studentSkills: string,
  ) => {
    setName(studentName);
    setEducation(studentEducation);
    setExperience(studentExperience);
    setIntrest(studentIntrest);
    setSkills(studentSkills);
    localStorage.setItem("name", studentName);
    localStorage.setItem("education", studentEducation);
    localStorage.setItem("intrest", studentIntrest);
    localStorage.setItem("experience", studentExperience);
    localStorage.setItem("skills", studentSkills);
  };

  return (
    <CareerContext.Provider
      value={{
        results,
        message,
        name,
        education,
        intrest,
        skills,
        experience,
        saveGuidance,
        saveProfile,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export const useCareer = () => useContext(CareerContext);
