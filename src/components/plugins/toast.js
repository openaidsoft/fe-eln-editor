import Vue from "vue";

const customToast = {
  install(Vue) {
    Vue.prototype.$_toast = function (msg) {
      removeToast();

      // 1. id가 'toast'인 div 생성
      let toastDiv = document.createElement("div");
      toastDiv.setAttribute("id", "toast");

      // 2. <p> 태그안에 매개변수 msg를 append
      let textEl = document.createElement("p");
      textEl.appendChild(document.createTextNode(msg));
      toastDiv.appendChild(textEl);

      // 3. 만들어진 div를 최상단인 <body> 안에 append
      document.body.appendChild(toastDiv);

      // 4. 2초 뒤에 사라지게 만들기
      let targetToast = document.getElementById("toast");
      setTimeout(function () {
        if (targetToast !== null) {
          targetToast.remove();
        }
      }, 2000);
    };
  },
};

// 기존 토스트가 남아있다면 삭제
function removeToast() {
  let toast = document.getElementById("toast");
  if (toast !== null) {
    toast.remove();
  }
}

Vue.use(customToast);
