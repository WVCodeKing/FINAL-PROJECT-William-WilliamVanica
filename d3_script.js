
// set the dimensions and margins of the graph
let yearMouse = 1967;

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  svgW = 460 - margin.left - margin.right,
  svgH = 400 - margin.top - margin.bottom;

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


// append the svg object to the body of the page
var svg = d3.select("#myChart")
  .append("svg")
  .attr("width", svgW + margin.left + margin.right)
  .attr("height", svgH + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .on('mouseenter', function() {
      div.transition()
      .duration(200)
      .style("opacity", .9);

     div.html(yearMouse)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
  })
 


// Add X axis --> it is a date format
var xVal = d3.scaleTime()
  .domain([
    // Define the domain of the x-scale using parsed dates
    d3.timeParse("%Y")("1967"),
    d3.timeParse("%Y")("2022")
  ])
  .range([0, svgW]);

//Read the data
d3.csv("data/ratings.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Final; })
    .entries(data);



  svg.append("g")
    .attr("transform", "translate(0," + svgH + ")")
    .call(d3.axisBottom(xVal).ticks(5));


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([
      35,
      d3.max(data, function(d) { return +d.Rating; })
    ])
    .range([svgH, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));


  // color palette
  var res = sumstat.map(function(d) { return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

  // Draw the line
  svg.selectAll(".line")
    .data(sumstat)
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", function(d) { return color(d.key) })
    .attr("stroke-width", 1.5)
    .attr("d", function(d) {

      return d3.line()
        .x(function(d) {
          return xVal(d3.timeParse("%Y")(d.Year));
        })
        .y(function(d) { return y(+d.Rating); })
        (d.values)
    })

})

var xLabel = "Year";
var yLabel = "TV Rating";

svg.append("text")
  .attr("class", "x-label")
  .attr("text-anchor", "end")
  .attr("x", svgW)
  .attr("y", svgH + margin.top + 20)
  .text(xLabel);

svg.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "end")
  .attr("y", -margin.left +15)
  .attr("transform", "rotate(-90)")
  .text(yLabel);

var xYear = d3.scaleLinear()
  .domain([0, svgW])
  .range([1967, 2022]);

function handleMouseMove() {
  // Get the x and y coordinates of the mouse relative to the SVG element
  const [x, y] = d3.mouse(this);
  // Use the inverse() method of the xScale to get the x-value corresponding to the x-coordinate of the mouse
  yearMouse = Math.round(xYear(x));

}


svg.on("mousemove", handleMouseMove);
