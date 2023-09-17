<template>
  <div id="myDiagramDiv" style="width: 1024px; height: 720px; background-color: #002b58"></div>
</template>

<script>
import go from "gojs";
export default {
  props: {
    moduleData: {
      required: true,
      type: Array,
    },
  },
  mounted: function () {
    const $ = go.GraphObject.make;
    let myDiagramDiv = $(go.Diagram, "myDiagramDiv", {
      "undoManager.isEnabled": false,
    });
    const myNodeTemplate = $(
      go.Node,
      "Auto",
      {},
      $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "#004378" }),
      $(
        go.Panel,
        "Table",
        { defaultAlignment: go.Spot.Left },
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 0, column: 0 },
          $(go.TextBlock, "tel:", {
            textAlign: "left",
            margin: 0,
            stroke: "white",
          }),
          $(go.TextBlock, "", { textAlign: "left", margin: 0, stroke: "white" }, new go.Binding("text", "tel"))
        ),
        $(go.TextBlock, "뭐지", { textAlign: "left", margin: 6, stroke: "white" }, { row: 0, column: 2 }),
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 1, column: 0 },
          $(go.TextBlock, "name:", {
            textAlign: "left",
            margin: 0,
            stroke: "white",
          }),
          $(go.TextBlock, "", { textAlign: "left", margin: 0, stroke: "white" }, new go.Binding("text", "name"))
        ),
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 2, column: 0 },
          $(go.TextBlock, "id:", {
            textAlign: "left",
            margin: 0,
            stroke: "white",
          }),
          $(go.TextBlock, "", { textAlign: "left", margin: 0, stroke: "white" }, new go.Binding("text", "id"))
        ),
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 3, column: 0 },
          $(go.TextBlock, "linkNum:", {
            textAlign: "left",
            margin: 0,
            stroke: "white",
          }),
          $(go.TextBlock, "", { textAlign: "left", margin: 0, stroke: "white" }, new go.Binding("text", "linkNum"))
        )
      )
    );
    let totalTemplate = $(
      go.Node,
      "Auto",
      {},
      $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "#004378" }),
      $(
        go.Panel,
        "Table",
        { defaultAlignment: go.Spot.Left },
        $(
          go.Panel,
          "TableRow",
          { background: "#063a73" },
          $(
            go.Panel,
            "Horizontal",
            { margin: 6 },
            { row: 0, column: 0 },
            $(go.TextBlock, "ㅇㅇ?:", {
              textAlign: "left",
              margin: 0,
              stroke: "white",
            }),
            $(go.TextBlock, "", { textAlign: "left", margin: 0, stroke: "#a5507b" }, new go.Binding("text", "totalNum")),
            $(go.TextBlock, "개", {
              textAlign: "left",
              margin: 0,
              stroke: "white",
            })
          )
        ),
        $(go.TextBlock, "모름", { textAlign: "left", margin: 6, stroke: "#5f9bda" }, { row: 0, column: 2 }),
        $(go.TextBlock, "", { margin: 6, stroke: "white", row: 1, column: 0 }, new go.Binding("text", "mission")),
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 2, column: 0 },
          $(go.TextBlock, "totalTel:", { margin: 0, stroke: "white" }),
          $(go.TextBlock, "", { margin: 0, stroke: "white" }, new go.Binding("text", "totalTel"))
        ),
        $(
          go.Panel,
          "Horizontal",
          { margin: 6 },
          { row: 3, column: 0 },
          $(go.TextBlock, "nodeId:", { margin: 0, stroke: "white" }),
          $(go.TextBlock, "", { margin: 0, stroke: "white" }, new go.Binding("text", "nodeId"))
        )
      )
    );
    let templmap = new go.Map();
    templmap.add("", myNodeTemplate);
    templmap.add("total", totalTemplate);
    myDiagramDiv.nodeTemplateMap = templmap;
    myDiagramDiv.layout = $(go.TreeLayout, { nodeSpacing: 3 });
    // Define a trivial link template with no arrowhead
    myDiagramDiv.linkTemplate = $(
      go.Link,
      {
        curve: go.Link.Bezier,
        toEndSegmentLength: 30,
        fromEndSegmentLength: 30,
      },
      $(go.Shape, { strokeWidth: 1.5, stroke: "#57728f" }) // the link shape, with the default black stroke
    );
    let myModel = $(go.TreeModel);
    myModel.nodeDataArray = this.moduleData;
    myDiagramDiv.model = myModel;
  },
};
</script>

<style></style>
