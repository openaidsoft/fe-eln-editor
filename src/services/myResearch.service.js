import axios from "axios";

const MY_RESEARCH_URL = "http://localhost:3005/projects";

class MyResearchService {
  getList() {
    return axios
      .get(MY_RESEARCH_URL, {})
      .then((response) => {
        console.log("get result : " + response.data);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
  getOne(id) {
    return axios
      .get(MY_RESEARCH_URL + "/" + id, {})
      .then((response) => {
        console.log("get one result : " + response.data);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
  moveAchive(year, title, tag, regNo, leader) {
    return axios
      .post(`http://localhost:3005/achive`, {
        year: year,
        title: title,
        tag: tag,
        regNo: regNo,
        leader: leader,
      })
      .then((response) => {
        console.log("achive post achive:" + response);
      })
      .catch((reason) => {
        console.log("error reason : " + reason);
      });
  }
  deleteProject(id) {
    return axios
      .delete(MY_RESEARCH_URL + "/" + id, {})
      .then((response) => {
        console.log("delete result : " + response.data);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
  postProject() {
    return axios
      .post(MY_RESEARCH_URL, {})
      .then((response) => {
        console.log("post result : " + response.data);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new MyResearchService();
