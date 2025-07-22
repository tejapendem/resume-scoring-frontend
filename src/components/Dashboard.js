
import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.css';
import Chart from './ScoreChart';
import { ThemeContext } from '../context/ThemeContext';

function Dashboard({ onLogout }) {
  const [jobDesc, setJobDesc] = useState('');
  const [resumes, setResumes] = useState([]);
  const [filterScore, setFilterScore] = useState(0);
  const [selectedResume, setSelectedResume] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://resume-scoring-backend.onrender.com/upload-resume', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setResumes(prev => [...prev, data]);
  };

  useEffect(() => {
    fetch("https://resume-scoring-backend.onrender.com/resumes")
      .then(res => res.json())
      .then(data => setResumes(data));
  }, []);

  const submitJobDesc = async () => {
    await fetch('https://resume-scoring-backend.onrender.com/job-description', {
      method: 'POST',
      body: new URLSearchParams({ description: jobDesc }),
    });

    const res = await fetch('https://resume-scoring-backend.onrender.com/resumes');
    const updated = await res.json();
    setResumes(updated);
  };

  const filtered = resumes.filter(r => r.score >= filterScore);

  return (
    <div className={`dashboard ${theme}`}>
      <div className="topbar">
        <h2>Resume Scoring System</h2>
        <div className="topbar-actions">
          <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
          <button onClick={onLogout}>Logout</button>
        </div>
      </div>

      <textarea
        className="jobdesc-box"
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={e => setJobDesc(e.target.value)}
      ></textarea>
      <button className="submit-btn" onClick={submitJobDesc}>Set Job Description</button>

      <input type="file" accept="application/pdf" onChange={handleUpload} />


      <div className="filter-box">
        <label>Filter by score ≥</label>
        <input
          type="number"
          value={filterScore}
          onChange={e => setFilterScore(e.target.value)}
          min="0"
          max="100"
        />
      </div>

      <table className="resume-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Score</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setSelectedResume(prev => prev?.filename === r.filename ? null : r)}
                >
                  {r.filename}
                </span>
              </td>
              <td>{r.name || '-'}</td>
              <td>{r.email || '-'}</td>
              <td>{r.phone || '-'}</td>
              <td>
                <span className={`badge score-${Math.floor(r.score / 10)}`}>
                  {r.score}
                </span>
              </td>
              <td>
                <a href={`https://resume-scoring-backend.onrender.com/download/${r.filename}`} download>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedResume && (
        <div className="preview-box">
          <h3>📄 {selectedResume.filename}</h3>
          <h4>📝 Summary</h4>
          <div className="summary-text">
          {selectedResume.summary
            ? selectedResume.summary.split('\n').map((line, i) => (
                <p key={i}>{line.trim()}</p>
              ))
            : <p>No summary available</p>}
          </div>
          <h4>🔧 Skills</h4>
          <ul>
            {selectedResume.skills && selectedResume.skills.length > 0 ? (
              selectedResume.skills.map((skill, i) => <li key={i}>{skill}</li>)
            ) : (
              <li>No skills extracted</li>
            )}
          </ul>
        </div>
      )}

      <Chart data={filtered.map(r => r.score)} />
    </div>
  );
}

export default Dashboard;
