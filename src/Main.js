import React, { Component } from "react";

class Main extends Component {
    render() {
        return (
            fetch('https://api.github.com/users/divinembunga/followers')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // Work with JSON data here
                    console.log(data)
                    return data

                })
                .catch(err => {
                    // Do something for an error here
                })
        );
    }
}

export default Main;