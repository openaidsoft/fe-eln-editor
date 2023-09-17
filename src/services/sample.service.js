import axios from "axios";

const DUMMY_API_URL = "https://jsonplaceholder.typicode.com/posts";

class SampleService {
  getList() {
    return axios
      .get(DUMMY_API_URL, {
        /*
          You can send parameters like:
          username : user.username,
          password : user.password
         */
      })
      .then(this.handleResponse)
      .then((response) => {
        console.log("response.data is ", response.data);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getDetail(id) {
    return axios
      .get(DUMMY_API_URL + "/" + id)
      .then(this.handleResponse)
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  handleResponse(response) {
    if (response.status === 401) {
      // You can do something
      location.reload(true);
      const error = response.data && response.data.message;
      return Promise.reject(error).catch((reason) => {
        console.log(reason);
      });
    }
    return Promise.resolve(response).catch((reason) => {
      console.log(reason);
    });
  }
}

export default new SampleService();
