
// Replace ./data.json with your JSON feed
fetch('https://api.github.com/users/divinembunga/followers')
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Work with JSON data here
        console.log(data)
        alert(data[0].login);
        //user_profile.social_media[1].description
    })
    .catch(err => {
        // Do something for an error here
    })
