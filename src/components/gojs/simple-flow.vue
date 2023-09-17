<template>
  <div id="simpleFlowDiagramDiv" style="width: 100%; height: 110px; background-color: light"></div>
</template>

<script>
import go from "gojs";
import { ref, reactive, toRaw } from "vue";

export default {
  name: "simple-flow",
  setup() {
    const date = ref(new Date());

    return {
      date,
    };
  },
  components: {},
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
      tagCnt: "",
    };
  },
  mounted() {
    const self = this;
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, "simpleFlowDiagramDiv", { hoverDelay: 200, layout: new go.TreeLayout({ setsPortSpot: false, setsChildPortSpot: false, isRealtime: false }) });

    var nodeHoverAdornment = $(
      go.Adornment,
      "Spot",
      {
        background: "transparent",
        // hide the Adornment when the mouse leaves it
        mouseLeave: (e, obj) => {
          var ad = obj.part;
          ad.adornedPart.removeAdornment("mouseHover");
        },
      },
      $(go.Placeholder, {
        background: "transparent", // to allow this Placeholder to be "seen" by mouse events
        isActionable: true, // needed because this is in a temporary Layer
        click: (e, obj) => {
          var node = obj.part.adornedPart;
          node.diagram.select(node);
        },
      }),
      // $("Button", { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right }, { click: (e, obj) => alert("Hi!") }, $(go.TextBlock, "Hi!"))
      $("Button", { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left }, { click: (e, obj) => alert("obj: " + obj.part.data.header, "e:" + e) }, $(go.TextBlock, "Bye"))
    );

    myDiagram.nodeTemplate = $(
      go.Node,
      "Vertical",
      { defaultStretch: go.GraphObject.Horizontal },
      // { locationObjectName: "BODY", isShadowed: true, shadowColor: "grey", shadowOffset: new go.Point(4, 4) },
      { locationObjectName: "BODY", isShadowed: true, shadowColor: "grey", shadowOffset: new go.Point(2, 2) },

      $(
        go.Panel,
        "Auto",
        { minSize: new go.Size(NaN, 30) },
        $(go.Shape, "Rectangle", { fill: "#e6f0f7", stroke: null }, new go.Binding("fill", "color")),
        $(go.TextBlock, { width: 40 }, { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" }, new go.Binding("text", "status")),
        {
          // show the Adornment when a mouseHover event occurs
          mouseHover: (e, obj) => {
            var node = obj.part;
            console.log(obj);
            console.log(obj.data);
            this.$emit("processData", obj.part.data);
            nodeHoverAdornment.adornedObject = node;
            node.addAdornment("mouseHover", nodeHoverAdornment);
          },
        }
        // $(go.TextBlock, { width: 20 }, { margin: new go.Margin(2, 2, 0, 2), textAlign: "right" }, new go.Binding("text", "status"))
      )
    );

    myDiagram.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal, corner: 5 }, $(go.Shape), $(go.Shape, { toArrow: "Triangle" }));

    myDiagram.model = new go.GraphLinksModel(
      [
        {
          key: 1,
          header: "Supplier1",
          text: "",
          status: "완료",
          footer: "Retailer",
          info: "shredded curtains",
          tagCnt: "1",
          tagVisible: true,
          chatCnt: "59",
          chatVisible: true,
          shareVisible: false,
          color: "green",
        },
        { key: 2, header: "Supplier2", text: "", status: "완료", footer: "Retailer", dueDate: "2022/05/01", tagVisible: false, chatCnt: "1", chatVisible: true, shareVisible: false, color: "green" },
        {
          key: 3,
          header: "Supplier3",
          text: "",
          status: "완료",
          footer: "Shipper",
          dueDate: "2022/05/01",
          tagCnt: "2",
          tagVisible: true,
          chatCnt: "1",
          chatVisible: true,
          shareVisible: false,
          color: "green",
        },
        { key: 4, header: "Supplier4", text: "", status: "진행", footer: "Retailer", dueDate: "2022/05/01", tagVisible: false, chatVisible: false, shareCnt: "3", shareVisible: true, color: "yellow" },
        { key: 5, header: "Supplier5", text: "", status: "대기", footer: "Retailer", dueDate: "2022/05/01", tagCnt: "3", tagVisible: true, shareCnt: "2", chatVisible: false, shareVisible: true },
        { key: 13, header: "Supplier6", text: "", status: "대기", footer: "Shipper", dueDate: "2022/05/01", tagCnt: "3", tagVisible: true, chatCnt: "5", chatVisible: true, shareVisible: false },
        { key: 14, header: "Supplier7", text: "", status: "대기", footer: "Retailer", dueDate: "2022/05/01", tagVisible: false, chatCnt: "99", chatVisible: true, shareVisible: false },
        { key: 15, header: "Supplier8", text: "", status: "대기", footer: "Retailer", dueDate: "2022/05/01", tagVisible: false, chatCnt: "10", chatVisible: true, shareVisible: false },
      ],
      [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 13 },
        { from: 13, to: 14 },
        { from: 1, to: 15 },
      ]
    );
  },
  methods: {
    addTags(tags) {
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
      console.log(linkdata);
      // and add the link data to the model
      model.addLinkData(linkdata);
      // select the new Node
      const newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      // snap the new node to a valid location

      newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
      // then account for any overlap
      // this.shiftNodesToEmptySpaces();
      diagram.commitTransaction("Add State");
    },
  },
};
</script>
