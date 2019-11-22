import React, { Component } from "react";
import * as d3 from "d3";
import {drag} from "d3";
class Main extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        const margin =60;
        const width =1000 - 2 * margin;
        const height = 600 - 2 * margin;

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin-left", margin);

        const  chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);


        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => height - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")


        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 100]);

        chart.append('g')
            .call(d3.axisLeft(yScale));

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(d3.map((s) => s.language))
            //would be part of the object where there is a name of the x scale
            //.domain([1,2,3,4,5])
            .padding(0.2);

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        const makeYLines = () => d3.axisLeft()
            .scale(yScale)

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            )

        chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(60, 0, 0)
                .tickFormat(''))


    }



    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Main;