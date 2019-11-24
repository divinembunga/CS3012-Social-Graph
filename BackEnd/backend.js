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

//array to store the languages
var languages =[];
async function getRepos() {
    var api_url = 'https://api.github.com/users/divinembunga/repos';
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data[0].language);

    for(var i=0; i<data.length;i++){
        if(data[i].language!==null){
            languages.push(data[i].language);
        }
    }
    getFollowersRepos();

}

async function getFollowersRepos() {
    var username;
    var api_url = 'https://api.github.com/users/divinembunga/followers';
    const response = await fetch(api_url);
    const data = await response.json();
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
    //count the number of repos that use each language
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

//save final json file to system
var fs = require('fs');

fs.appendFile('data.json', codingLang, function (err) {
if (err) throw err;
console.log('Saved!');
});