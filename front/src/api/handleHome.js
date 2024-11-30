import axios from "axios";
import Config from "../utils/config.json";
export const fileUploadApi = async (payload) => {
    const { setNotifMessage, setInputErrors, files, setFiles, id } = payload;
  
    try {
      const formData = new FormData();
      formData.append("file", files[files.length - 1]); 
      formData.append("id", id);
  
      const response = await axios.post(`${Config.Configuration.database}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            ...response.data.file, 
          },
        ]);
        
        setNotifMessage({ success: response.data.message });
      } else {
        setInputErrors({ file_size: "File upload failed" });
      }
    } catch (error) {
        console.log(error)
        setNotifMessage({ error: "Failed to upload file" });
    }
};
  
export const fileRemoveApi = async (payload) => {
    const { setNotifMessage, setFilesRetrieved, fileId } = payload;
  
    try {
      const response = await axios.delete(`${Config.Configuration.database}/remove/${fileId}`);

      if (response.status === 200) {
        setFilesRetrieved((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
        setNotifMessage({ success: "File removed successfully" });
      }
    } catch (error) {
      console.log(error)
      setNotifMessage({ error: "Failed to remove file" });
    }
};

export const getFilesApi = async (payload) => { 
  const { setFilesRetrieved, setNotifMessage, id } = payload;

  try {
    const response = await axios.get(`${Config.Configuration.database}/files/${id}`);

    if (response.data.success) {
      setFilesRetrieved(response.data.files);
    } else {
      setNotifMessage({ error: "Failed to retrieve files" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fileDownloadApi = async (filename) => {
  try {
    const response = await axios.get(`${Config.Configuration.database}/files/download/${filename}`, {
      responseType: 'blob',  
    });

    const url = response.request.responseURL; 
    const filenameUrl = url.substring(url.lastIndexOf('/') + 1);
    const blob = new Blob([response.data], { type: response.headers['content-type'] });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filenameUrl; 
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

