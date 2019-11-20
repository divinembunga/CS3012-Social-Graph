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
const api_url = 'https://api.github.com/users/divinembunga/followers';
async function getFollowers(){
    const response = await fetch(api_url);
    const data = await response.json();
    var i;
    var count=0;
    for(i=0; i< data.length;i++){
        const{login, followers_url} = data[i];
        count++;
        //document.getElementById('l').textContent = login;
        document.getElementById('f').textContent = followers_url;
    }
    document.getElementById("count").innerHTML= count;
}

getFollowers();
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