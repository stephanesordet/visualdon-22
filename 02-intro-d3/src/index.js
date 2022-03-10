import * as d3 from 'd3';


var svgCircle = d3.select("body").append("svg").attr("width", 500).attr("height", 500)

var circle1 = svgCircle.append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 40)
  .attr('fill', '#69a3b2');
var circle2 = svgCircle.append('circle')
  .attr('cx', 150)
  .attr('cy', 150)
  .attr('r', 40)
  .attr('fill', '#69a3b2');
var circle3 = svgCircle.append('circle')
  .attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 40)
  .attr('fill', '#69a3b2');

circle2.attr('fill', '#69c3b2')
circle2.attr('cx', 200)
circle3.attr('cx', 300)

circle3.on("click", () => {
  circle1.attr('cx', 300);
  circle2.attr('cx', 300);
})

d3.select("svg").append("text").text("circle1").attr("x", "50").attr("y", "100")
d3.select("svg").append("text").text("circle2").attr("x", "200").attr("y", "200")
d3.select("svg").append("text").text("circle3").attr("x", "300").attr("y", "300")

const widthRect = 20;
const data2 = [20, 5, 25, 8, 15];

const myDiv2 = d3.select("svg")
  
myDiv2.selectAll("rect")
  .data(data2)
  .enter()
  .append("rect")
  .attr('x', (d,i) => (i*23+50))
  .attr('y', d => 500-d)
  .attr('width', widthRect)
  .attr('height', d => d)
  .attr('stroke', 'black')
  .attr('fill', '#69a3b2');