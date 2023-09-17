import axios from "axios";

const CODE_URL = "http://localhost:3005/code";

class CodeService {
  getCode() {
    return axios
      .get(CODE_URL, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  saveCode(res, title) {
    return axios
      .put(CODE_URL, {
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

  editCode(res, comment, userId, date, pageCommentId) {
    var data = {
      userId: userId,
      comment: comment,
      date: date,
      pageCommentId: pageCommentId,
    };
    res.comments.push(data);
    return axios
      .patch(CODE_URL, {
        comments: res.comments,
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  delCode(checkorder, res, thisContent) {
    if (checkorder == "0") {
      thisContent = [];
    }
    return axios
      .put(CODE_URL, {
        title: res.title,
        comments: thisContent,
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new CodeService();
