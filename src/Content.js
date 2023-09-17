import Utils from "@/components/cmm/Utils.js";
const uid = new Utils();

export default {
  URL: "http://localhost:3000",

  JEXCEL: "excel",
  JSME: "jsme",
  FORMULA: "formula",
  IMAGE: "image",
  EDITOR_TYPE_OPT: ["excel", "jsme", "formula", "image", "divider"],
  EDITOR_TAG_OPT: ["color", "background"],
  OPT_REACTION: "reaction",
  OPT_FULL_SCREEN: "fullScreenIcon",
};

export function basic_block() {
  const basic_block = {
    block: {
      background: "",
      color: "",
      icon: "",
      iconStyle: "",
      style: "",
      editTag: "",
      editTagId: "",
      html: "",
      tag: "p",
      positionId: uid.getUid(),
    },
    id: uid.getNewId(),
    order: 0,
    comments: "",
    image: { url: "", imageNm: "" },
  };
  return basic_block;
}
