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
    window.open(`http://127.0.0.1:8000/download/${filename}`, "_blank");
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


// import React, { useState } from "react";
// import { sendJobDescription, uploadResume } from "../services/api";

// const ResumeApp = () => {
//   const [jobDesc, setJobDesc] = useState("");
//   const [resumes, setResumes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [preview, setPreview] = useState(null);

//   const handleJDSubmit = async () => {
//     await sendJobDescription(jobDesc);
//     alert("Job description submitted");
//   };

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     const data = await uploadResume(file);
//     setResumes([...resumes, data]);
//   };

//   const downloadFile = (filename) => {
//     window.open(`http://127.0.0.1:8000/download/${filename}`, "_blank");
//   };

//   const filteredResumes = resumes.filter((res) =>
//     res.filename.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     const fetchResumes = async () => {
//       const res = await fetch("http://127.0.0.1:8000/resumes");
//       const data = await res.json();
//       setResumes(data);
//     };
//     fetchResumes();
//   }, []);

//   return (
//     <div className="container">
//       <div className="job-box">
//         <h3>Paste Job Description</h3>
//         <textarea
//           value={jobDesc}
//           onChange={(e) => setJobDesc(e.target.value)}
//         />
//         <button onClick={handleJDSubmit}>Submit</button>
//       </div>

//       <div className="upload-box">
//         <input type="file" accept=".pdf" onChange={handleUpload} />
//         <input
//           type="text"
//           placeholder="Filter by name or score"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="resume-list">
//         <div className="resume-header">
//           <strong>Filename</strong>
//           <strong>Name</strong>
//           <strong>Email</strong>
//           <strong>Phone</strong>
//           <strong>Score</strong>
//           <strong>Download</strong>
//         </div>

//         {filteredResumes.map((res, index) => (
//           <div key={index} className="resume-card">
//             <div
//               className="filename-cell"
//               onClick={() => setPreview(res)}
//               style={{ cursor: "pointer", color: "blue" }}
//             >
//               {res.filename}
//             </div>
//             <div>{res.name || "-"}</div>
//             <div>{res.email || "-"}</div>
//             <div>{res.phone || "-"}</div>
//             <div className={`score ${getScoreClass(res.score)}`}>
//               {res.score}%
//             </div>
//             <button onClick={() => downloadFile(res.filename)}>⬇️</button>
//           </div>
//         ))}
//       </div>

//       {preview && (
//         <div className="preview-box">
//           <h3>📄 {preview.filename}</h3>
//           <h4>📝 Summary</h4>
//           <pre>{preview.summary || "No summary available"}</pre>
//           <h4>🔧 Skills</h4>
//           <ul>
//             {preview.skills && preview.skills.length > 0 ? (
//               preview.skills.map((skill, i) => <li key={i}>{skill}</li>)
//             ) : (
//               <li>No skills extracted</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// function getScoreClass(score) {
//   if (score > 80) return "high";
//   if (score > 50) return "medium";
//   return "low";
// }

// export default ResumeApp;
