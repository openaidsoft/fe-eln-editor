import axios from "axios";

const JEXCEL_URL = "http://localhost:3005/jexcel";

class JexcelService {
  getJexcelData() {
    return axios
      .get(JEXCEL_URL + "/" + 4, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getTemplateData() {
    return axios
      .get(JEXCEL_URL + "/" + 54, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  saveJexcelData(data, width) {
    console.log(data);
    return axios
      .post(JEXCEL_URL, {
        data: data,
        column: width,
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getJsmeData() {
    return axios
      .get(JEXCEL_URL + "/" + 24, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  //   editJexcelData(res, comment, userId, date, pageCommentId) {
  //     var data = {
  //       userId: userId,
  //       comment: comment,
  //       date: date,
  //       pageCommentId: pageCommentId,
  //     };
  //     res.comments.push(data);
  //     return axios
  //       .patch(JEXCEL_URL, {
  //         comments: res.comments,
  //       })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((reason) => {
  //         console.log(reason);
  //       });
  //   }

  //   delJexcelData(checkorder, res, thisContent) {
  //     if (checkorder == "0") {
  //       thisContent = [];
  //     }
  //     return axios
  //       .put(JEXCEL_URL, {
  //         title: res.title,
  //         comments: thisContent,
  //       })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((reason) => {
  //         console.log(reason);
  //       });
  //   }
}

export default new JexcelService();
