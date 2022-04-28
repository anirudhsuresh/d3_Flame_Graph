var flameGraph = d3
  .flameGraph()
  .cellHeight(25)
  .transitionDuration(1150)
  .transitionEase(d3.easeCubic)
  .sort(true)
  .label(function (d) {
    return "name: " + d.data.name + ", value: " + d.data.value;
  })
  .onClick(function (d) {
    console.info("You clicked on frame " + d.data.name);
  })
  .title("Flame Graph");

// flamegraph.setColorHue("warm");

// tooltips
var tip = d3
  .tip()
  .direction("s")
  .offset([8, 0])
  .attr("class", "d3-flame-graph-tip")
  .html(function (d) {
    return "name: " + d.data.name + ", value: " + d.data.value;
  });

flameGraph.tooltip(tip);

var svg = d3
  .select("div#container")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 300 300")
  .classed("svg-content", true);

d3.json("data.json", function (error, data) {
  if (error) return console.warn(error);
  d3.select("#chart")
    .append("svg")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("width", "auto")
    .attr("height", "auto")
    // .attr("viewBox", "100 1000 150 150")
    .datum(data)
    .classed("svg-content", true)
    .call(flameGraph);
});

// reset zoom
function resetZoom() {
  flameGraph.resetZoom();
}

// listen also for the enter event
var input = document.getElementById("searchBar");
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    search();
  }
});

function clearFlame() {
  document.getElementById("searchBar").value = "";
  flameGraph.clear();
}
// search functions and event listner
function search() {
  var search_term = document.getElementById("searchBar").value;
  console.log(search_term);
  flameGraph.search(search_term);
}
