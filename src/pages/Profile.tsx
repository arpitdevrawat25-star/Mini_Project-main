import Adminsidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/user.png";
import { useCareer } from "../CarrierContext";

const Profile = () => {
  const { name, education, experience, intrest, skills } = useCareer();
  const age = 20;

  const skillList = skills
    ? skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    : [];

  return (
    <div className="adminContainer">
      <Adminsidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for Data" />
          <img src={userImg} alt="User" />
          <FaRegBell />
        </div>

        <section className="profile-container">
          <div className="profile-card">
            <img src={userImg} alt="Student" />
            <h2>{name || "Student "}</h2>
            <span className="profile-badge">{experience || "Beginner"}</span>

            <div className="profile-info">
              <p>
                <span>Age</span>
                <strong>{age}</strong>
              </p>
              <p>
                <span>Interest</span>
                <strong>{intrest || "Not Added "}</strong>
              </p>
              <p>
                <span>Education</span>
                <strong>{education}</strong>
              </p>
            </div>

            <div className="profile-section">
              <h3>Skills</h3>
              <div className="skill-tags">
                {skillList.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
console.log(localStorage.getItem("name"));

export default Profile;
