import React, { Component } from "react";


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
var followerQueue=[];
var userQueue= ["divinembunga"];
var numberOfFollowers = 0;
const MAX_FOLLOWERS =12;
const NEW_USER = -1;
const DEFAULT = 1;

//hard coding my gitHub username into the code
var user ={
    login: "divinembunga",
    followers: [],
}
 var userPosition =0;
//migt have to append the username to the url or before you
//call that function again you change that url since it is a variable
//might need to change it as a variable then
const api_url = 'https://api.github.com/users/divinembunga/followers';
async function getFollowers(){
    const response = await fetch(api_url);
    const data = await response.json();
    var i;
    var count=0;
    for(i=0; i< data.length;i++){
        const{login, followers_url} = data[i];
        count++;
        var follower ={
            username: data[i].login,
            followers: [],
        }
        if(userPosition ==0){
            followerQueue.push(follower);
            numberOfFollowers++;
        }
        if(isNewFollower(follower.username,user.followers) && follower.username != user.login){
            user.followers.push(follower);
        }
        //followerQueue.push(login);
        //document.getElementById('l').textContent = login;
        document.getElementById('f').textContent = followers_url;
    }
    userPosition =1;
    document.getElementById("count").innerHTML= count;
}

function isNewFollower(username,followers){
    for(var i =0; i<followers.length; i++){
        if(username === followers[i].username){
            return false;
        }
    }
    return true;
}

function getFollowersOfFollower(){
    while(numberOfFollowers != MAX_FOLLOWERS)
    {
        var user = followerQueue.shift();
        numberOfFollowers++
        getFollowers(user);
    }
}
getFollowers();
function followersToD3(d3, user, source) {

    var target = getTarget(d3, user);

    if (target == NEW_USER) {

        var node = {
            name: user.username,
            group: DEFAULT
        }
        d3.nodes.push(node);
        target = d3.nodes.length-1;

        var link = {
            source: source,
            target: target,
            value: DEFAULT
        }
        d3.links.push(link);

    }
    for (var i = 0; i < user.contributors.length && i < MAX_NUMBER_OF_CONTRIBUTORS; i++)
        followersToD3(d3, user.contributors[i], target);
     }

function getTarget(d3, user) {
    for (var i = 0; i < d3.nodes.length; i++)
        if (d3.nodes[i].name == user.username)
            return i;
    return NEW_USER;
}
var graph = '<br><br><br><br><br><h3 style="color:#5cb85c;">Your contributor social graph</h3><p>Contributors of contributors of your repos<br><br>';
graph += '<svg id="graph" width="' + $("#display").width() + '" height="650px"></svg>';
$("#display").html(graph);

var d3 = {
    nodes: ["divinembunga", "isobelm",
    links: []
}
contributorsToD3(d3, userQueue[0], 0);
constructSocialGraph(d3);
class Main extends Component {

    render() {
        return (
            <div>
                <h1>Social Graph</h1>
                <p>
                    Number of followers:<span id="count"></span>

                </p>
                <p>
                    follower: <span id ="f"></span>
                </p>

                <div className="content">

                </div>
            </div>
        );
    }
}

export default Main;