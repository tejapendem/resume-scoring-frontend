// const API_BASE = "http://127.0.0.1:8000";

// export const sendJobDescription = async (description) => {
//   const form = new FormData();
//   form.append("description", description);
//   const res = await fetch(`${API_BASE}/job-description`, {
//     method: "POST",
//     body: form,
//   });
//   return res.json();
// };

// export const uploadResume = async (file) => {
//   const form = new FormData();
//   form.append("file", file);
//   const res = await fetch(`${API_BASE}/upload-resume`, {
//     method: "POST",
//     body: form,
//   });
//   return res.json();
// };

const API_BASE = "http://127.0.0.1:8000";

export const sendJobDescription = async (description) => {
  const form = new FormData();
  form.append("description", description);
  const res = await fetch(`${API_BASE}/job-description`, {
    method: "POST",
    body: form,
  });
  return res.json();
};

export const downloadResume = async (filename) => {
  const response = await fetch(`${API_BASE}/download-resume/${filename}`);
  const blob = await response.blob();

  // Trigger file download
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const uploadResume = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/upload-resume`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  return {
    filename: data.filename,
    score: data.score,
    text: data.text,
    name: data.name,
    email: data.email,
    phone: data.phone,
    summary: data.summary,
    skills: data.skills || [],
  };
};
