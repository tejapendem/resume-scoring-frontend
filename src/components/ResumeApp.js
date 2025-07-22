import React, { useState } from "react";
import { sendJobDescription, uploadResume } from "../services/api";

const ResumeApp = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);

  const handleJDSubmit = async () => {
    await sendJobDescription(jobDesc);
    alert("Job description submitted");
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const data = await uploadResume(file);
    setResumes([...resumes, data]);
  };

  const downloadFile = (filename) => {
    window.open(`https://resume-scoring-backend.onrender.com/download/${filename}`, "_blank");
  };

  const filteredResumes = resumes.filter((res) =>
    res.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="job-box">
        <h3>Paste Job Description</h3>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button onClick={handleJDSubmit}>Submit</button>
      </div>

      <div className="upload-box">
        <input type="file" accept=".pdf" onChange={handleUpload} />
        <input
          type="text"
          placeholder="Filter by name or score"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="resume-list">
        {filteredResumes.map((res, index) => (
          <div key={index} className="resume-card">
            <div onClick={() => setPreview(res)} style={{ flex: 1 }}>
              <strong>{res.filename}</strong>
              <span className={`score ${getScoreClass(res.score)}`}>
                {res.score}%
              </span>
            </div>
            <button onClick={() => downloadFile(res.filename)}>⬇️</button>
          </div>
        ))}
      </div>

      {preview && (
        <div className="preview-box">
          <h3>📄 {preview.filename}</h3>
          <pre>{preview.text}</pre>
        </div>
      )}
    </div>
  );
};

function getScoreClass(score) {
  if (score > 80) return "high";
  if (score > 50) return "medium";
  return "low";
}

export default ResumeApp;

