# Software Engineering
## CS3012: Social Graph

### Task
Interrogate the GitHub API to build visualisation of data available tht elucidates some aspect of the softare engineering process, such as a social graph of developers and projects, or a visualisation of indiviudal of team performance. Provide a visualisation of this using the d3js library. See https://d3js.org


### My Approach
My original plan was to create a force directed graph using the d3 libaray displaying the connections of followers between my own github account and my followers accounts. I was able to get the required data from the API and store it, however, after following the example of the implementation of a force directed graph on the d3js.orgs webpage, it never displayed. After countless attempts at **commit 8** I decided to change the project and start over even though I spent time and effort on the other approach.


I dedcided to display the programming languages of the repositories of my own and my followers through an **interactive bar chart**.

![Bar-Chart](https://github.com/divinembunga/CS3012-Social-Graph/blob/master/Screenshots/Screenshot%20(138).png)


When the mouse hovers over a bar, the opacity of the bar changes and every other bar diplays the percentage difference it has from the bar being hovered, **see example below**.

![Example](https://github.com/divinembunga/CS3012-Social-Graph/blob/master/Screenshots/Screenshot%20(141).png)


The folder **BackEnd** conatins a Node.js file that communicated with the GitHub API and retrieved the data of the programming languages and the corresponding number of repos and creates a json file, data.json and stores the created json in there.

The code that displayes the bar chart can be found in **src/Main.js**

### Additional Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


