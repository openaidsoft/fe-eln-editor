import { ref, onMounted } from "vue";

class Utils {
  constructor() {}

  randomGenerator() {
    const code = "1234567890";
    var hash = 0;
    var i;
    var chr;
    if (code.length === 0) return hash;
    for (i = 0; i < code.length; i++) {
      chr = code.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    const codeGenerated = "JSME_" + (hash < 0 ? hash * -1 : hash);
    return codeGenerated;
  }

  getUid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(0, 2);
  }

  getNewId() {
    return "axxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getNewDate() {
    const date = ref(new Date());
    const day = date.value.getDate();
    const month = date.value.getMonth() + 1;
    const year = date.value.getFullYear();
    const hour = date.value.getHours();
    const minute = date.value.getMinutes();

    return `${year}/${month}/${day}-${hour}:${minute}`;
  }

  getTime() {
    const date = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const day = date.value.getDate();
    const month = date.value.getMonth() + 1;
    const year = date.value.getFullYear();
    const hour = date.value.getHours();
    const minute = date.value.getMinutes();
    const second = date.value.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
}

export default Utils;
