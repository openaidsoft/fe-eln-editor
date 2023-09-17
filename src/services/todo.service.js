import axios from "axios";

const TODO_URL = "http://localhost:3005/todo";

class TodoService {
  getTodoList() {
    return axios
      .get(TODO_URL, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  postTodoList(content) {
    return axios
      .post(TODO_URL, {
        content: content,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new TodoService();
