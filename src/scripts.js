
// Replace ./data.json with your JSON feed
import {Argv as json} from "yargs";

fetch('https://api.github.com/users/divinembunga/followers')
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Work with JSON data here
       // var myObj = JSON.parse(this.data);
       // document.getElementById("demo").innerHTML = myObj[1];
        console.log(data)
        const{login, followers_url} = data[0];

        //user_profile.social_media[1].description
    })
    .catch(err => {
        // Do something for an error here
    })
