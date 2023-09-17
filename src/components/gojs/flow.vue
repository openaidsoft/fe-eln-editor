<template>
  <div id="flowDiagramDiv" style="width: 100%; height: 720px; background-color: light"></div>
  <Modal v-if="showModal" @close="showModal = Modal" :width="'400px'">
    <template v-slot:header>
      <h3>Add Project</h3>
    </template>
    <template v-slot:body>
      <form>
        <div class="form-group mb-2">
          <label for="title" class="form-label-control">Title : </label>
          <input class="form-control" v-model="title" type="text" />
        </div>
        <div class="form-group mb-2">
          <label for="title">Due Date : </label>
          <Datepicker v-model="due_date" class="form-control" :inputFormat="yyyyMMdd" type="date" />
        </div>
        <div class="form-group mb-2">
          <label for="title">Status : </label>
          <select class="form-control" v-model="status">
            <option value="대기">대기</option>
            <option value="진행">진행</option>
            <option value="완료">완료</option>
          </select>
        </div>
        <div class="form-group mb-2">
          <label for="title">Tags : </label>
          <Tag @inputTags="addTags"></Tag>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <Button @click="save()">생성</Button>
      <Button @click="close()">닫기</Button>
    </template>
  </Modal>
  <todoList @onClose="slideClose" :show="isTodoOpen" :offcanvasEnd="isEndPosition"></todoList>
</template>

<script>
import go from "gojs";
import Modal from "@/components/cmm/Modal.vue";
import Tag from "@/components/cmm/Tag.vue";
import todoList from "@/components/todo/todoSlideView.vue";

import Datepicker from "vue3-datepicker";
import { ref, reactive, toRaw } from "vue";

export default {
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
  components: {
    Modal,
    Datepicker,
    Tag,
    todoList,
  },
  data() {
    return {
      showModal: false,
      title: "",
      status: "",
      tags: "asdfsadfas",
      diaAdd: false,
      obj: "test",
      due_date: ref(new Date()),
      isTodoOpen: false,
      isEndPosition: false,
      tagCnt: "",
    };
  },
  mounted() {
    const self = this;
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, "flowDiagramDiv", {
      layout: new go.TreeLayout({ setsPortSpot: false, setsChildPortSpot: false, isRealtime: false }),
    });

    myDiagram.nodeTemplate = $(
      go.Node,
      "Vertical",
      { defaultStretch: go.GraphObject.Horizontal },
      { locationObjectName: "BODY", isShadowed: true, shadowColor: "grey", shadowOffset: new go.Point(4, 4) },

      $(
        go.Panel,
        "Auto",
        $(go.Shape, "Rectangle", { fill: "#8ea6c1", stroke: null }),
        $(go.TextBlock, { width: 200 }, { margin: 10, textAlign: "left", stroke: "white" }, new go.Binding("text", "header")),
        $(
          go.Picture,
          { width: 23, height: 23 },
          {
            source: "/images/yellowtag.png",
            column: 0,
            margin: 10,
            alignment: go.Spot.Right,
            click: function (e, obj) {
              //tag action
            },
          }
        ),
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            "Circle",
            { fill: "gray", margin: new go.Margin(20, 0, 0, 230), cursor: "pointer", stroke: null, width: 18, height: 18, alignment: go.Spot.Right },
            new go.Binding("visible", "tagVisible")
          ),
          $(go.TextBlock, { margin: 5, textAlign: "center", stroke: "white" }, new go.Binding("text", "tagCnt"))
        )
      ),
      $(
        go.Panel,
        "Auto",
        { minSize: new go.Size(NaN, 70) },
        $(go.Shape, "Rectangle", { fill: "#e6f0f7", stroke: null }),
        $(go.TextBlock, { width: 200 }, { margin: new go.Margin(2, 2, 0, 2), textAlign: "left" }, new go.Binding("text", "text")),
        $(go.TextBlock, { width: 200 }, { margin: new go.Margin(2, 2, 0, 2), textAlign: "right" }, new go.Binding("text", "status"))
      ),

      $(
        go.Panel,
        "Auto",
        $(go.Shape, "Rectangle", { fill: "#8ea6c1", stroke: null, cursor: "pointer" }),
        $(
          go.Picture,
          { width: 20, height: 20 },
          {
            source: "/images/share.png",
            column: 0,
            margin: 10,
            alignment: go.Spot.Left,
            click: function (e, obj) {
              //move share
            },
          }
        ),
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            "Circle",
            { fill: "gray", margin: new go.Margin(20, 190, 0, 0), cursor: "pointer", stroke: null, width: 15, height: 15, alignment: go.Spot.Right },
            new go.Binding("visible", "shareVisible")
          ),
          $(go.TextBlock, { margin: 5, textAlign: "center", stroke: "white" }, new go.Binding("text", "shareCnt"))
        ),
        $(
          go.Picture,
          { width: 20, height: 20, cursor: "pointer" },
          {
            source: "/images/list.png",
            column: 0,
            margin: new go.Margin(0, 0, 0, 45),
            alignment: go.Spot.Left,
            click: function (e, obj) {
              self.todolist();
            },
          }
        ),
        $(
          go.Picture,
          { width: 20, height: 20, cursor: "pointer" },
          {
            source: "/images/chat.png",
            column: 0,
            margin: new go.Margin(0, 0, 0, 80),
            alignment: go.Spot.Left,
            click: function (e, obj) {
              //move chat
            },
          }
        ),
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            "Circle",
            { fill: "gray", margin: new go.Margin(20, 50, 0, 0), cursor: "pointer", stroke: null, width: 18, height: 18, alignment: go.Spot.Right },
            new go.Binding("visible", "chatVisible")
          ),
          $(go.TextBlock, { margin: 5, textAlign: "center", stroke: "white" }, new go.Binding("text", "chatCnt"))
        ),
        $(
          go.Panel,
          "Auto",
          {
            alignment: go.Spot.Right,
            portId: "from",
            fromLinkable: true,
            cursor: "pointer",
            click: function (e, obj) {
              self.inputModal(obj);
            },
          },
          $(go.Shape, "Circle", { width: 22, height: 22, fill: "white", stroke: "dodgerblue", strokeWidth: 3 }),
          $(go.Shape, "PlusLine", { width: 11, height: 11, fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
          { toolTip: $("ToolTip", $(go.TextBlock, { margin: 4, text: "add Node" })) }
        )
      )
    );

    myDiagram.nodeTemplateMap.add(
      "Recycle",
      $(
        go.Node,
        "Auto",
        {
          portId: "to",
          toLinkable: true,
          deletable: false,
          layerName: "Background",
          locationSpot: go.Spot.Right,
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          dragComputation: (node, pt, gridpt) => pt,
          mouseDrop: (e, obj) => myDiagram.commandHandler.deleteSelection(),
        },
        $(go.Shape, { fill: "lightgray", stroke: "gray" }),
        $(go.TextBlock, "Drop Here\nTo Delete", { margin: 5, textAlign: "center" })
      )
    );

    myDiagram.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, $(go.Shape), $(go.Shape, { toArrow: "Triangle" }));

    myDiagram.model = new go.GraphLinksModel(
      [
        {
          key: 1,
          header: "Supplier",
          text: "due date",
          status: "대기",
          footer: "Retailer",
          info: "shredded curtains",
          tagCnt: "1",
          tagVisible: true,
          chatCnt: "59",
          chatVisible: true,
          shareVisible: false,
        },
        // { key: 16, category: "Recycle" },
        // { key: 2, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagVisible: false, chatCnt: "1", chatVisible: true, shareVisible: false },
        // { key: 3, header: "Supplier", text: "due date", status: "대기", footer: "Shipper", tagCnt: "2", tagVisible: true, chatCnt: "1", chatVisible: true, shareVisible: false },
        // { key: 4, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagVisible: false, chatVisible: false, shareCnt: "3", shareVisible: true },
        // { key: 5, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagCnt: "3", tagVisible: true, shareCnt: "2", chatVisible: false, shareVisible: true },
        // { key: 13, header: "Supplier", text: "due date", status: "대기", footer: "Shipper", tagCnt: "3", tagVisible: true, chatCnt: "5", chatVisible: true, shareVisible: false },
        // { key: 14, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagVisible: false, chatCnt: "99", chatVisible: true, shareVisible: false },
        // { key: 15, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagVisible: false, chatCnt: "10", chatVisible: true, shareVisible: false },
        // { key: 16, header: "Supplier", text: "due date", status: "대기", footer: "Retailer", tagVisible: false, chatCnt: "10", chatVisible: true, shareVisible: false, category: "Recycle" },
      ]
      // [
      //   { from: 1, to: 2 },
      //   { from: 2, to: 3 },
      //   { from: 3, to: 4 },
      //   { from: 4, to: 5 },
      //   { from: 5, to: 13 },
      //   { from: 13, to: 14 },
      //   { from: 1, to: 15 },
      // ]
    );
  },
  methods: {
    addTags(tags) {
      console.log(tags);
      this.tagCnt = tags.length;
    },
    todolist() {
      this.isEndPosition = true;
      this.isTodoOpen = true;
    },
    slideClose() {
      this.isTodoOpen = false;
    },
    inputModal(obj) {
      this.showModal = true;
      this.obj = obj;
    },
    save() {
      this.addNodeAndLink(this.obj);
      this.showModal = false;
    },
    close() {
      this.showModal = false;
    },
    addNodeAndLink() {
      console.log(this.obj);
      console.log(this.obj.part);
      var t = reactive(this.obj.part);
      const fromNode = toRaw(t);
      const diagram = fromNode.diagram;
      diagram.startTransaction("Add State");
      // get the node data for which the user clicked the button
      const fromData = fromNode.data;
      // create a new "State" data object, positioned off to the right of the fromNode
      const p = fromNode.location.copy();
      p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
      //수정
      this.due_date.toString();
      const seperDate = this.due_date.toString().split(" ");
      const date = seperDate[0] + " " + seperDate[1] + " " + seperDate[2] + " " + seperDate[3];
      const toData = {
        header: this.title,
        text: date,
        status: this.status,
        footer: "Retailer",
        tagCnt: this.tagCnt,
        tagVisible: this.tagCnt > 0 ? true : false,
        chatCnt: "",
        chatVisible: false,
        shareVisible: false,
        loc: go.Point.stringify(p),
      };
      // add the new node data to the model
      const model = diagram.model;
      model.addNodeData(toData);
      // create a link data from the old node data to the new node data
      const linkdata = {
        from: model.getKeyForNodeData(fromData),
        to: model.getKeyForNodeData(toData),
      };
      // and add the link data to the model
      model.addLinkData(linkdata);
      // select the new Node
      const newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      // snap the new node to a valid location

      console.log(linkdata);
      console.log(diagram.model.nodeDataArray); // 생성된 다이어그램 목록을 가져옴

      newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
      // then account for any overlap
      // this.shiftNodesToEmptySpaces();
      diagram.commitTransaction("Add State");
    },
  },
};
</script>
