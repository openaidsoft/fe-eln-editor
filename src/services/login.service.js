import axios from "axios";

const LOGIN_URL = "http://localhost:3005/users";

class LoginService {
  confirmUser(values) {
    const params = values;
    console.log(params);
    return axios
      .get(LOGIN_URL, { params })
      .then((response) => {
        console.log("Member response : ", response.data.length);
        return response.data.length;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new LoginService();
