import React, { Component } from "react";
import * as d3 from "d3";
import data from  './data.json';


class Main extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        //setup the chart
        const margin =50;
        const width =2000 - 2 * margin;
        const height = 600 - 2 * margin;

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin-left", margin);
        //getting data from the created file
        const codingLanguage= (data);

        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

        //making the x-axis
        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(codingLanguage.map((c) => c.language))
            .padding(0.4)
        //making the y-axis
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 80]);
        //making the horizontal grid lines
        const makeYLines = () => d3.axisLeft()
            .scale(yScale)

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        chart.append('g')
            .call(d3.axisLeft(yScale));


        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            )
        //creating, evaluating and displaying the bars
        const barGroups = chart.selectAll()
            .data(codingLanguage)
            .enter()
            .append('g')

        barGroups
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.language))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .on('mouseenter', function (actual, i) {
                d3.selectAll('.value')
                    .attr('opacity', 0)
                //changing the opacity when hovered over
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 0.6)
                    .attr('x', (a) => xScale(a.language) - 5)
                    .attr('width', xScale.bandwidth() + 10)

                const y = yScale(actual.value)

                var line = chart.append('line')
                    .attr('id', 'limit')
                    .attr('x1', 0)
                    .attr('y1', y)
                    .attr('x2', width)
                    .attr('y2', y)
                //labelling the bars with % difference when hovered over
                barGroups.append('text')
                    .attr('class', 'divergence')
                    .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                    .attr('y', (a) => yScale(a.value) + 30)
                    .attr('fill', 'white')
                    .attr('text-anchor', 'middle')
                    .text((a, idx) => {
                        const divergence = (a.value - actual.value).toFixed(1)

                        let text = ''
                        if (divergence > 0) text += '+'
                        text += `${divergence}%`

                        return idx !== i ? text : '';
                    })

            })
            //returning to original opacity when hovered is released
            .on('mouseleave', function () {
                d3.selectAll('.value')
                    .attr('opacity', 1)

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('opacity', 1)
                    .attr('x', (a) => xScale(a.language))
                    .attr('width', xScale.bandwidth())

                chart.selectAll('#limit').remove()
                chart.selectAll('.divergence').remove()
            })
        //displaying the label of the percentage on bars when not hovered
        barGroups
            .append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('text-anchor', 'middle')
            .text((a) => `${a.value}%`)
       //labelling axes
        svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Number of repos(%)')

        svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', height + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Languages')

        svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Repo Programming Languages')


    }



    render(){
        return <div id={"#" + this.props.id}></div>
        //display the d3 bar graph
    }
}

export default Main;