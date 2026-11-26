import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useCareer, type Career } from "../CarrierContext";

const CareerGuidance = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [interest, setInterest] = useState("technology");
  const [level, setLevel] = useState("beginner");
  const [skills, setSkills] = useState("");
  const [details, setDetails] = useState("");
  const { saveGuidance, saveProfile } = useCareer();
  const [results, setResults] = useState<Career[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(name, education, interest, level, skills);

    try {
      const response = await fetch("http://localhost:5001/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          skills,
          interest,
          level,
          education,
          details,
        }),
      });

      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      setResults(data.results);
      setSubmitted(true);
      saveGuidance(data.message, data.results);
    } catch (error) {
      console.log(error);
      alert("Cannot reach the Python server. Is it running?");
    }
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="careerguidance">
        <h2 className="page-title">AI Career Guidance</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Education</label>
          <input
            type="text"
            placeholder="Example: BCA 2nd year"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />

          <label>Interest Area</label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="technology">Technology</option>
            <option value="data">Data</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>

          <label>Experience Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label>Your Skills (separate with commas)</label>
          <input
            type="text"
            placeholder="Example: html, css, python"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />

          <label>Other Details</label>
          <textarea
            rows={4}
            placeholder="Your goals, hobbies, projects..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <button type="submit">Get Guidance</button>
        </form>

        {submitted && (
          <section className="results">
            <h3>Hi {name}, here are your top careers</h3>
            <p>{message}</p>
            {results.map((item) => (
              <div className="result-card" key={item.name}>
                <div className="result-top">
                  <h4>{item.name}</h4>
                  <span>{item.match}% match</span>
                </div>
                <p>{item.about}</p>
                <div className="progress">
                  <div style={{ width: item.match + "%" }}></div>
                </div>
                {item.missing.length > 0 ? (
                  <p>Skills to learn: {item.missing.join(", ")}</p>
                ) : (
                  <p>You already have all the key skills!</p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default CareerGuidance;
