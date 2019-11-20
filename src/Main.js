import React, { Component } from "react";
import * as d3 from "d3";
import {drag} from "d3";
import {JSONSchema7 as invalidation} from "json-schema";



/*fetch('https://api.github.com/users/divinembunga/followers')
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Work with JSON data here
        // var myObj = JSON.parse(this.data);
        // document.getElementById("demo").innerHTML = myObj[1];
        console.log(data)
        const{login, followers_url} = data[1];
        document.getElementById('l').textContent = login;
        document.getElementById('f').textContent = followers_url;
        //user_profile.social_media[1].description
    })
    .catch(err => {
        // Do something for an error here
    })*/

//var userQueue= ["divinembunga"];
var mainUser ={
    login: 'divinembunga',
    followers: [],
};

var followerQueue=[mainUser];
var numberOfFollowers = 0;
const MAX_FOLLOWERS =12;
const NEW_USER = -1;
const DEFAULT = 1;

//hard coding my gitHub username into the code

 var userPosition =0;
 getFollowers(mainUser);
drawGraph();
//migt have to append the username to the url or before you
//call that function again you change that url since it is a variable
//might need to change it as a variable then
//var api_url = 'https://api.github.com/users/divinembunga/followers';
async function getFollowers(user){
    var api_url = 'https://api.github.com/'+user.login+'/followers';
    const response = await fetch(api_url);
    const data = await response.json();
    var i;
    var count=0;
    for(i=0; i< data.length;i++){
        const{login, followers_url} = data[i];
        count++;
        var follower ={
            login: data[i].login,
            followers: [],
        };
        if(userPosition ==0){
            followerQueue.push(follower);
            getFollowersOfFollower();
            numberOfFollowers++;
        }
        if((isNewFollower(follower.login,user.followers) && follower.login != user.login)){
            user.followers.push(follower);
        }
        //followerQueue.push(login);
        //document.getElementById('l').textContent = login;
        document.getElementById('f').textContent = followers_url;
    }
    userPosition =1;
   // document.getElementById("count").innerHTML= count;
}

function isNewFollower(username,followers){
    for(var i =0; i<followers.length; i++){
        if(username === followers[i].login){
            return false;
        }
    }
    return true;
}

function getFollowersOfFollower(){
    while(numberOfFollowers < MAX_FOLLOWERS)
    {
        var user = followerQueue.shift();
        numberOfFollowers++;
        //api_url ="https://api.github.com/users/"+user.login+"/followers";
        getFollowers(user);
    }
}

function followersToD3(d3, mainUser, source) {

    var target = getTarget(d3, mainUser);

    if (target == NEW_USER) {

        var node = {
            name: mainUser.username,
            group: DEFAULT
        }
        d3.nodes.push(node);
        target = d3.nodes.length - 1;

        var link = {
            source: source,
            target: target,
            value: DEFAULT
        }
        d3.links.push(link);

    }
    var i;
    var size = mainUser.followers;
    for (i = 0; i < size.length && i < MAX_FOLLOWERS; i++)
        followersToD3(d3, mainUser.followers[i], target);
    }

    function getTarget(d3, mainUser) {
        for (var i = 0; i < d3.nodes.length; i++)
            if (d3.nodes[i].name == mainUser.username)
                return i;
        return NEW_USER;
    }


    function drawGraph() {
        var graph = '<br><br><br><br><br><h3 style="color:#5cb85c;">Your contributor social graph</h3><p>Contributors of contributors of your repos<br><br>';
        graph += '<svg id="graph" width="' + screen.availWidth + '" height="650px"></svg>';
        ("#display").html(graph);
        var d3 = {
            nodes: [{
                name: mainUser.username,
                group: DEFAULT
            }],
            links: []
        }
        followersToD3(d3, mainUser, 0);
        socialGraph(d3);
    }

    function socialGraph(data) {

        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(100 / 2, 100 / 2));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, 100, 100]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", "#5F9EA0")
            .call(drag(simulation));

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        //invalidation.then(() => simulation.stop());

        return svg.node();


        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        return d => scale(d.group);


        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);


    }


class Main extends Component {
    render() {
        return (
            <div>
                <h1>Network Graph</h1>
                <div id ="graph">

                </div>


            </div>

        );
    }
}

export default Main;




