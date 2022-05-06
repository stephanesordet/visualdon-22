import * as d3 from 'd3'
import dataIncome from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import dataLifeExpectancy from '../data/life_expectancy_years.csv'
import dataPopulation from '../data/population_total.csv'

const margin = {
    top: 50,
    right: 10,
    bottom: 0,
    left: 100
},
width = window.innerWidth * 0.7 - margin.left - margin.right,
height = window.innerHeight * 0.9 - margin.top - margin.bottom;


//Scale
const maxGDP = d3.max(dataIncome, function(d) { return cleanData(d[2021]); });
const minGDP = d3.min(dataIncome, function(d) { return cleanData(d[2021]); });
const maxExpectancy = d3.max(dataLifeExpectancy, function(d) { return cleanData(d[2021]); })
const minExpectancy = d3.min(dataLifeExpectancy, function(d){return cleanData(d[2021]); })
const maxPop = d3.max(dataPopulation, function(d) { return cleanData(d[2021]); })
const minPop = d3.min(dataPopulation, function(d){return cleanData(d[2021]); })

const svgGraph = d3.select('body').append('svg').attr('class', 'graph');

svgGraph.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scaleLinear()
.domain([minGDP, maxGDP])
.range([10, width]);

svgGraph.append('g')
.attr("transform", "translate(5," + height + ")")
.call(d3.axisTop(x).ticks(35).tickSize(10)).selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-0.6em")
.attr("dy", "2.4em")
.attr("transform", "rotate(-65)");

//Pow pour avoir une échelle exponentielle qui se concentre vers 0
const y = d3.scalePow()
.domain([0, maxExpectancy])
.range([height, 0])
.exponent(3);

svgGraph.append('g')
.call(d3.axisRight(y).ticks(10)); 

//Sqrt pour équilibrer les tailles des cercles 
const r = d3.scaleSqrt()
.domain([minPop, maxPop])
.range([0, 30]);

//Circles
for (var i = 0; i < dataPopulation.length; i++) {
svgGraph.append("circle")
.attr("cx", x(cleanData(dataIncome[i]["2021"]))).attr("cy", y(dataLifeExpectancy[i]["2021"])).attr("r", r(cleanData(dataPopulation[i]["2021"]))) .style("fill", "blue");
}

//Clean Data
function cleanData(data) {
if (isNaN(data)) {
    if (data.includes("k")) {
        const n = data.split("k")[0];
        return Number.parseFloat(n) * 1000;
    } else if (data.includes("M")) {
        const n = data.split("M")[0];
        return Number.parseFloat(n) * 1000000;

    } else if (data.includes("B")) {
        const n = data.split("B")[0];
        return Number.parseFloat(n) * 1000000000;
    }
}
return data;
}

function getData(currentYear) {
	const currentLife = dataLifeExpectancy.map((year) => {
		return { country: year["country"], life: year[currentYear] };
	});
	const currentPop = dataPopulation.map((year) => {
		return { country: year["country"], pop: year[currentYear] };
	});
	const currentIncome = dataIncome.map((year) => {
		return { country: year["country"], income: year[currentYear] };
	});
	const nextLife = dataLifeExpectancy.map((year) => {
		return { country: year["country"], life: year[currentYear + 1] };
	});
	const nextPop = dataPopulation.map((year) => {
		return { country: year["country"], pop: year[currentYear + 1] };
	});
	const nextIncome = dataIncome.map((year) => {
		return { country: year["country"], income: year[currentYear + 1] };
	});

    let data = [];
	for (let i = 0; i < dataIncome.length; i++) {
		data.push({
			country: currentIncome[i].country,
			currentPop: cleanData(currentPop[i].pop),
			currentLife: cleanData(currentLife[i].life),
			currentIncome: cleanData(currentIncome[i].income),
			nextPop: cleanData(nextPop[i].pop),
			nextLife: cleanData(nextLife[i].life),
			nextIncome: cleanData(nextIncome[i].income),
		});
	}
	return data;
}

let t = d3.transition().duration(1000).ease(d3.easeLinear);
const firstYear = 1980;
const lastYear = 2021;
const svgGraph2 = d3.select("body").append("svg");
let currentYear = firstYear;

svgGraph2.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgGraph2.append('g')
.attr("transform", "translate(5," + height + ")")
.call(d3.axisTop(x).ticks(35).tickSize(10)).selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-0.6em")
.attr("dy", "2.4em")
.attr("transform", "rotate(-65)"); 

svgGraph2.append('g')
.call(d3.axisRight(y).ticks(10));

(function draw() {
	const data = getData(currentYear);

	svgGraph2
		.selectAll("circle")
		.data(data)
		.join(
			(enter) =>
				enter
					.append("circle")
					.attr("cx", (d) => x(d.currentIncome))
					.attr("cy", (d) => y(d.currentLife))
					.attr("r", (d) => r(d.currentPop))
					.attr("class", (d) => `countryCircle ${d.country}`),
			(update) =>
				update
					.transition()
					.duration(1000)
					.attr("cx", (d) => x(d.nextIncome))
					.attr("cy", (d) => y(d.nextLife))
					.attr("r", (d) => r(d.nextPop)),
			(exit) => exit.attr("r", (d) => r(d.nextPop)).remove()
		)
		.style("fill", "rgba(100, 0, 0, 0.4)")
		.attr("transform", "translate(100, 10)");
	if (currentYear < lastYear) {
		currentYear++;
		setTimeout(draw, 1000);
	}
})();
