import axios from "axios";

const SIDEBAR_MENU_URL = "http://localhost:3005/sidebarMenu";
const SIDEBAR_PROJECT_MENU_URL = "http://localhost:3005/projects";
const SIDEBAR_NORMAL_MENU_URL = "http://localhost:3005/normal_note";

class SidebarMenuService {
  getMenu() {
    return axios
      .get(SIDEBAR_MENU_URL, {
        use: "Y",
      })
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getOneMenu(id) {
    return axios
      .get(SIDEBAR_MENU_URL + "/" + id, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  saveMenu(title, url) {
    console.log(title);
    console.log(url);
    return axios
      .post(SIDEBAR_MENU_URL, {
        title: title,
        path: url,
        icon: "fa fa-th",
        use: "Y",
        children: [],
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  saveChildrenMenu(id, res, title, url) {
    console.log(res);
    var data = {
      path: url,
      title: title,
      icon: "fas fa-caret-right",
    };
    res.children.push(data);

    return axios
      .patch(SIDEBAR_MENU_URL + "/" + id, {
        children: res.children,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  delMenu(content) {
    return axios
      .post(SIDEBAR_MENU_URL, {})
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getProjectMenu() {
    return axios
      .get(SIDEBAR_PROJECT_MENU_URL, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  getNormalMenu() {
    return axios
      .get(SIDEBAR_NORMAL_MENU_URL, {})
      .then((response) => {
        return response.data;
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

export default new SidebarMenuService();
