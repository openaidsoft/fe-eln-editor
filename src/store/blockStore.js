import { defineStore } from "pinia";
import { saveBlockService } from "@/components/w-editor/w-editor-service.js";

export const blockStore = defineStore({
  id: "blockStore",
  state: () => ({
    notes: [],
    savedTime: "",
    reqTime: "",
    reqStTime: 0,
    count: 0,
  }),
  actions: {
    setNotes(note_uid, title, blocks) {
      const data = {
        uid: note_uid,
        title: title,
        blocks: blocks,
      };
      //초기화 마지막 값만 저장
      this.notes.splice(0);
      this.notes.push(data);
      this.reqTime = new Date().getTime();
      this.reqStTime++;
      if (this.reqStTime === 1) {
        this.stateCheck();
      }
    },
    stateCheck() {
      const interval = setInterval(() => {
        if (this.reqTime !== "") {
          this.count++;
          if (this.count === 30) {
            saveBlockService(this.notes[0].uid, this.notes[0].title, this.notes[0].blocks);
            this.afterSave();
          }
        }
      }, 1000);
      if (this.reqTime === "") {
        clearInterval(interval);
      }
    },
    afterSave() {
      this.savedTime = new Date().getTime();
      this.reqTime = "";
      this.count = 0;
    },
    resetData() {
      this.savedTime = "";
      this.reqTime = "";
      this.count = 0;
    },
    saveLocalStorage() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
      console.log("localStorage 저장");
    },
    getLocalStorage() {
      const getStorageNote = localStorage.getItem("notes");
      console.log("getStorageNote==> ");
      console.log(getStorageNote);
      if (getStorageNote !== "null") {
        const noteContents = JSON.parse(getStorageNote);
        console.log(noteContents[0])
        saveBlockService(noteContents[0].uid, noteContents[0].title, noteContents[0].blocks);
      }
      localStorage.setItem("notes", null);
    },
  },
});
