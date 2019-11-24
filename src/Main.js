import React, { Component } from "react";
import * as d3 from "d3";
import {drag} from "d3";

//hardcoding the language names due to the bug
const codingLang = [
    {
        language: 'JavaScript',
        value: 0

    },
    {
        language: 'Java',
        value: 0

    },
    {
        language: 'C',
        value: 0

    },
    {
        language: 'C++',
        value: 0

    },
    {
        language: 'Processing',
        value: 0
    },
    {
        language: 'TypeScript',
        value: 0
    },
    {
        language: 'Python',
        value: 0
    },
    {
        language: 'Lua',
        value: 0
    },
    {
        language: 'HTML',
        value: 0
    },
    {
        language: 'CSS',
        value: 0
    },
    {
        language: 'PHP',
        value: 0
    },
    {
        language: 'Vue',
        value: 0
    },
    {
        language: 'Batchfile',
        value: 0
    },
    {
        language: 'Go',
        value: 0
    },
    {
        language: 'Assembly',
        value: 0
    },
    {
        language: 'MATLAB',
        value: 0
    },
    {
        language: 'TeX',
        value: 0
    },
    {
        language: 'VDHL',
        value: 0
    },
    {
        language: 'Prolog',
        value: 0,
        color: '#fbcb39'
    },
    {
        language: 'C#',
        value: 0
    },
    {
        language: 'Haskell',
        value: 0
    },
    {
        language: 'Shell',
        value: 0
    },
    {
        language: 'Yacc',
        value: 0
    },
];
var languages =[];
async function getRepos() {
    var api_url = 'https://api.github.com/users/divinembunga/repos';
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data[0].language);

    for(var i=0; i<data.length;i++){
        if(data[i].language!==null){
            languages.push(data[i].language);
            //languages[i]=(data[i].language);
        }
    }
    //console.log(languages)
    getFollowersRepos();

}

async function getFollowersRepos() {
   // var isSame =0;
    var username;
    var api_url = 'https://api.github.com/users/divinembunga/followers';
    const response = await fetch(api_url);
    const data = await response.json();
    //console.log(data[0].language);
    for(var k=0; k<data.length;k++) {
        username = data[k].login;
        var fapi_url = 'https://api.github.com/users/' + username + '/repos';
        const fresponse = await fetch(fapi_url);
        const fdata = await fresponse.json();
        for (var l = 0; l < fdata.length; l++) {
            if (fdata[l].language !== null) {
                languages.push(fdata[l].language);
            }
                /*Tried looping through the array
                languages to check if the language had
                already been placed in the array
                but there was a weird bug that would allow
                the comparison of the strings in the
                array when it reached the length of 6
                for(var m=0; m<languages.length;m++){
                    console.log(languages.length);
                    if(fdata[l].language===languages[m]){
                        isSame=1;
                        //languages[m]=fdata[l].language;
                        //console.log(fdata[l].language);
                    }

                }
                if(isSame === 0){
                    //console.log("push");
                    languages.push(fdata[l].language);
                }
                //languages.push(fdata[l].language);
                //languages[i]=(data[i].language);
            }*/
        }
    }
   // console.log(languages);
    addValues();


}

function addValues(){
    for(var i=0; i<codingLang.length; i++){
        var count=0;
        for(var j=0; j<languages.length;j++){
            if(codingLang[i].language === languages[j]){
               count++;
           }
        }
        codingLang[i].value =count;
    }
    console.log(codingLang);
}




getRepos();
class Main extends Component {
    //getRepos();
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        getRepos();

        const sam = codingLang;
        //const data = [12, 5, 6, 6, 9, 10];
        //const dataNames = ["java","phyton","c#","Ruby"];
        const margin =50;
        const width =2000 - 2 * margin;
        const height = 600 - 2 * margin;

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin-left", margin);

        /*const svg = d3.select('svg');
        const svgContainer = d3.select('#container');

        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;*/
        const codingLanguage = [
            {
                language: 'JavaScript',
                value: 32

            },
            {
                language: 'Java',
                value: 74

            },
            {
                language: 'C',
                value: 48

            },
            {
                language: 'C++',
                value: 2

            },
            {
                language: 'Processing',
                value: 18
            },
            {
                language: 'TypeScript',
                value: 4
            },
            {
                language: 'Python',
                value: 26
            },
            {
                language: 'Lua',
                value: 2
            },
            {
                language: 'HTML',
                value: 20
            },
            {
                language: 'CSS',
                value: 6
            },
            {
                language: 'PHP',
                value: 2
            },
            {
                language: 'Vue',
                value: 4
            },
            {
                language: 'Batchfile',
                value: 2
            },
            {
                language: 'Go',
                value: 2
            },
            {
                language: 'Assembly',
                value: 16
            },
            {
                language: 'MATLAB',
                value: 2
            },
            {
                language: 'TeX',
                value: 8
            },
            {
                language: 'VDHL',
                value: 0
            },
            {
                language: 'Prolog',
                value: 6
            },
            {
                language: 'C#',
                value: 8
            },
            {
                language: 'Haskell',
                value: 10
            },
            {
                language: 'Shell',
                value: 4
            },
            {
                language: 'Yacc',
                value: 4
            },
        ];
        const sample = [
            {
                language: 'Rust',
                value: 78.9,
                //color: '#000000'
            },
            {
                language: 'Kotlin',
                value: 75.1,
                //color: '#00a2ee'
            },
            {
                language: 'Python',
                value: 68.0,
                color: '#fbcb39'
            },
            {
                language: 'TypeScript',
                value: 67.0,
                color: '#007bc8'
            },
            {
                language: 'Go',
                value: 65.6,
                color: '#65cedb'
            },
            {
                language: 'Swift',
                value: 65.1,
                color: '#ff6e52'
            },
            {
                language: 'JavaScript',
                value: 61.9,
                color: '#f9de3f'
            },
            {
                language: 'C#',
                value: 60.4,
                color: '#5d2f8e'
            },
            {
                language: 'F#',
                value: 59.6,
                color: '#008fc9'
            },
            {
                language: 'Clojure',
                value: 59.6,
                color: '#507dca'
            }
        ];

        //const svg = d3.select('svg');
        //const svgContainer = d3.select('#container');

       // const margin = 80;
       // const width = 1000 - 2 * margin;
        //const height = 600 - 2 * margin;
//
        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(codingLanguage.map((c) => c.language))
            .padding(0.4)

        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 80]);

        // vertical grid lines
        // const makeXLines = () => d3.axisBottom()
        //   .scale(xScale)

        const makeYLines = () => d3.axisLeft()
            .scale(yScale)

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        chart.append('g')
            .call(d3.axisLeft(yScale));

        // vertical grid lines
        // chart.append('g')
        //   .attr('class', 'grid')
        //   .attr('transform', `translate(0, ${height})`)
        //   .call(makeXLines()
        //     .tickSize(-height, 0, 0)
        //     .tickFormat('')
        //   )

        chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            )

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

        barGroups
            .append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('text-anchor', 'middle')
            .text((a) => `${a.value}%`)

        svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Love meter (%)')

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
            .text('Most loved programming languages in 2018')

        svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', height + margin * 1.7)
            .attr('text-anchor', 'start')
            .text('Source: Stack Overflow, 2018')



    }



    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Main;