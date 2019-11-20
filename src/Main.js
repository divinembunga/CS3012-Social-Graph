import React, { Component } from "react";


fetch('https://api.github.com/users/divinembunga/followers')
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
    })
class Main extends Component {

    render() {
        return (
            <div>
                <h1>Social Graph</h1>
                <p>
                    login: <span id ="l"></span>
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