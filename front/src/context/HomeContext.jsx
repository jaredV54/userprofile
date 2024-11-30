import { useState, createContext, useContext, useEffect } from "react";
import { fileUploadApi, fileRemoveApi, getFilesApi, fileDownloadApi } from "../api/handleHome"; 
import { useApiResponse } from "../hooks/useApiResonse";

const HomeContext = createContext();

export const useHome = () => {
  return useContext(HomeContext);
};

export const HomeProvider = ({ children, id }) => {
  const [files, setFiles] = useState([]);
  const [filesRetrieved, setFilesRetrieved] = useState([]);
  const { notifMessage, setNotifMessage, setInputErrors } = useApiResponse();

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles)); 
  };

  const handleFileUpload = async () => {
    if (files.length === 0) {
      setInputErrors({ file: "No file selected" });
      return;
    }

    const payload = {
      setNotifMessage,
      setInputErrors,
      files,
      setFiles,
      id
    };

    await fileUploadApi(payload); 
  };

  const removeFile = (fileId) => {
    const payload = {
      setNotifMessage,
      setInputErrors,
      files,
      setFilesRetrieved,
      fileId
    };
    
    fileRemoveApi(payload); 
  };

  const handleDownload = (filename) => {
    fileDownloadApi(filename);
  };

  useEffect(() => {
  const payload = {
    setFilesRetrieved, 
    setNotifMessage,
    id
  };

  getFilesApi(payload);
  }, [files])

  return (
    <HomeContext.Provider value={{ 
      files, 
      handleFileUpload, 
      removeFile, 
      handleFileChange, 
      filesRetrieved,
      notifMessage,
      setNotifMessage, 
      handleDownload
     }}>
      {children}
    </HomeContext.Provider>
  );
};
