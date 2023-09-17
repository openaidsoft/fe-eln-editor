<template>
  <div id="youDiagramDiv" style="width: 1024px; height: 720px; background-color: white"></div>
</template>
<script>
import go from "gojs";
export default {
  mounted() {
    const $ = go.GraphObject.make;
    const myDiagram = $(go.Diagram, "youDiagramDiv", {
      "undoManager.isEnabled": true,
      layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }),
    });

    // the template we defined earlier
    myDiagram.nodeTemplate = new go.Node("Horizontal", { background: "#44CCFF" })
      .add(new go.Picture({ margin: 10, width: 50, height: 50, background: "beige" }).bind("source"))
      .add(new go.TextBlock("Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" }).bind("text", "name"));

    // the same model as before
    myDiagram.model = new go.TreeModel([
      { key: "1", name: "Don Meow", source: "cat1.png" },
      { key: "2", parent: "1", name: "Demeter", source: "cat2.png" },
      { key: "3", parent: "1", name: "Copricat", source: "cat3.png" },
      { key: "4", parent: "3", name: "Jellylorum", source: "cat4.png" },
      { key: "5", parent: "3", name: "Alonzo", source: "cat5.png" },
      { key: "6", parent: "2", name: "Munkustrap", source: "cat6.png" },
    ]);
  },
};
</script>
