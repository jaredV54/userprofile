import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/handleLogin";
import { useHome } from "../../context/HomeContext";
import { Notif } from "../ui/Notif";

const Home = ({ user }) => {
  const { 
    files = [], 
    handleFileUpload, 
    removeFile, 
    handleFileChange, 
    filesRetrieved, 
    notifMessage, 
    setNotifMessage, 
    handleDownload 
  } = useHome();
  const navigate = useNavigate();

  const logoutUser = () => {
    logoutApi(navigate);
  };

  return (
    <>
      <Notif notifMessage={notifMessage} setNotifMessage={setNotifMessage} />
      <nav className="navbar">
        <h1>{`Welcome${files.length > 0 ? " back" : ""}, ${user?.username || "Guest"}`}</h1>
        <div className="profile-dropdown">
          <button className="dropdown-button">Profile</button>
          <ul className="dropdown-menu">
            <li onClick={() => navigate("/profile")}>Profile</li>
            <li onClick={() => navigate("/settings")}>Settings</li>
            <li onClick={logoutUser}>Logout</li>
          </ul>
        </div>
      </nav>

      <div className="upload-section">
        <h2>Uploaded Files</h2>
        <input
          type="file"
          accept=".doc,.docx,.pdf,.png,.jpeg,.jpg"
          onChange={handleFileChange}
        />
        <button type="button" onClick={handleFileUpload}>Upload</button>
        <ul>
          <table >
            <thead>
              <tr>
                <th>File name</th>
                <th>Size</th>
                <th>type</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
          </table>
          {filesRetrieved.length > 0 ? (
            filesRetrieved.map((file, index) => (
            <table key={index}>
              <tbody>
                <tr>
                  <td>{file.original_filename}</td>
                  <td>{file.file_size}</td>
                  <td>{file.file_type}</td>
                  <td><button onClick={() => removeFile(file.id)}>Remove</button></td>
                  <td><button onClick={() => handleDownload(file.original_filename)}>Download</button></td>
                </tr>
            </tbody>
            </table>
            ))
          ) : (
            <p>No files uploaded</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
