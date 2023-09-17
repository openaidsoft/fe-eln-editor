class Jspreadsheet extends HTMLElement {
  constructor() {
    super();
  }

  init(o, cols, rows) {
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Style
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = "https://bossanova.uk/jspreadsheet/v4/jexcel.css";
    shadowRoot.appendChild(css);

    const css2 = document.createElement("link");
    css2.rel = "stylesheet";
    css2.type = "text/css";
    // css2.href = "/node_modules/jsuites/dist/jsuites.css";
    css2.href = "https://jsuites.net/v4/jsuites.css";
    shadowRoot.appendChild(css2);

    const css3 = document.createElement("link");
    css3.rel = "stylesheet";
    css3.type = "text/css";
    css3.href = "https://fonts.googleapis.com/css?family=Material+Icons";
    // css3.href = "/node_modules/jsuites/dist/jsuites.basic.css";
    shadowRoot.appendChild(css3);

    // Jspreadsheet container
    var container = document.createElement("div");
    // shadowRoot.addEventListener("mouseout", function (event) {
    //   container.blur();
    //   // shadowRoot.blur();
    // });

    shadowRoot.appendChild(container);

    var table = jspreadsheet(container, {
      root: shadowRoot,
      minDimensions: [cols, rows],
      about: false,
      toolbar: [
        {
          type: "i",
          content: "undo",
          onclick: function () {
            table.undo();
          },
        },
        {
          type: "i",
          content: "redo",
          onclick: function () {
            table.redo();
          },
        },
        {
          type: "i",
          content: "save",
          onclick: function () {
            table.download();
          },
        },
        {
          type: "select",
          k: "font-family",
          v: ["Arial", "Verdana"],
        },
        {
          type: "select",
          k: "font-size",
          v: ["9px", "10px", "11px", "12px", "13px", "14px", "15px", "16px", "17px", "18px", "19px", "20px"],
        },
        {
          type: "i",
          content: "format_align_left",
          k: "text-align",
          v: "left",
        },
        {
          type: "i",
          content: "format_align_center",
          k: "text-align",
          v: "center",
        },
        {
          type: "i",
          content: "format_align_right",
          k: "text-align",
          v: "right",
        },
        {
          type: "i",
          content: "format_bold",
          k: "font-weight",
          v: "bold",
        },
        {
          type: "color",
          content: "format_color_text",
          k: "color",
        },
        {
          type: "color",
          content: "format_color_fill",
          k: "background-color",
        },
      ],
    });
  }

  connectedCallback() {
    //  this.init(this);
  }

  disconnectedCallback() {}

  // attributeChangedCallback() {}

  static get observedAttributes() {
    return ["options"];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      const obj = JSON.parse(newVal);
      this.innerHtml = "";
      this.init(this, obj.cols, obj.rows);
    }
  }
}

window.customElements.define("j-spreadsheet", Jspreadsheet);
