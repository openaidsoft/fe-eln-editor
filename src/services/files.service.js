import axios from "axios";

const FILES_URL = "http://localhost:3005/files";

class FileService {
  saveFiles(files) {
    console.log(files);
    return axios
      .post(FILES_URL, files, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  savePage(res, title) {
    return axios
      .put(FILES_URL, {
        title: title,
        comments: res.comments,
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new FileService();
