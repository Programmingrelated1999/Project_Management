# Project_Management(Project-Tracker)

### Description
Project-Tracker is a tool designed to help teams effectively manage their work remotely. Whether you are a group of software engineers working together on a sprint or a group of students working on a presentation, project-tracker provides you a handful of tools to organize your work. By sigining up to the application, you will find great tools such as Kanban board, Bugs and Tasks Tracker, Personalized notice boards and Data Visualizations. The best thing about the app is that you can work through many projects and different teams within a single account. Plus, you do not need to sign up with email. (Might Be Implemented Later)

Visit the application https://main--zesty-gaufre-aeee46.netlify.app/

Below are some screenshots of the tools:

<img src = "https://user-images.githubusercontent.com/83194014/199562370-2be8e03c-3cdb-4466-87da-0d9769a0813f.PNG" width = "500px"/>
<img src = "https://user-images.githubusercontent.com/83194014/199562372-2718c4ee-98a4-4472-b261-d60e964e5ddb.PNG" width = "500px"/>
<img src = "https://user-images.githubusercontent.com/83194014/199562373-e7b9f40c-1dc2-489e-a341-2cdfa165878c.PNG" width = "500px"/>
<img src = "https://user-images.githubusercontent.com/83194014/199562375-3cda4154-d2d0-48a9-a79b-0006bea0ccb9.PNG" width = "500px"/>

## Backend Link
For full explanation and usage of backend API, please visit [Backend Repository](https://github.com/Programmingrelated1999/project-tracker-backend)

### Contents
* [Time Line](#timeline)
* [Tools Involved](#tools-involve)
* [Journal](#journal)
* [How to Use(With Screenshots)](#how-to-use)
* [For Developers](#for-developers)
* [Work in Progress](#work-in-progress)

### TimeLine
The first version of the application was developed from 16 Sept 2022 to 1 Nov 2022.

### Tools Involve
* Front-End-Framework: React.js(18.0.17)
* Design: CSS, React-Bootstrap, MaterialUI, Mantime UI
* Data-Visualizations: d3-ease, React-chart, React-Circular-Progress-Bar, Chart.js
* Time-Functions: day.js, moment.js
* State-Management: Redux
* Routes: React-Router
* Communcation: Axios
* Compiling: Vite(3.1.0)

### Journal

### How to Use

### For Developers
The frontend was developed with Vite and React.js. Therefore, you may need vite to run the application. 

1) First you need to clone the repository. If you are not famaliar with this, Step by Step Guide can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

2) Second you need to install node, and npm to run. The node version is 16.15.0 and npm version is 8.11.0. They can be install through this link https://nodejs.org/en/.

3) Run this command on the terminal of your root directory.
```sh
$ npm install
```

4) If you prefer to use the backend API already hosted, skip to step 7. Then you need to clone the backend API repository. It can be found on [backend](https://github.com/Programmingrelated1999/project-tracker-backend). 

5) Then install the required modules with the command from Step 3.

6) Run the following command from the root of your backend directory.
```sh
$ npm run dev
```

7) Before we run the front-end, there are a few changes to note. In the reducers files and in src/components/Login/services/loginServices.js, you will see that there are links declared on top of the file. There will always be two links and one is always commented. If you prefer to use the backend from you local repository uncomment the links starting with localhost:3001 and comment other links. If you prefer to use the backend API already hosted, comment the links starting with localhost:3001 and uncomment the rest. To start the front-end run this command from your root directory.

```sh
$ npm run dev
```

8) You will see a link provided by vite after successful run. Clicking on the link will take you to the hosted page.

9) Enjoy! And make sure to let me know if there are any impovements you can see. 

### Work in Progress
There are a few things that need to be developed further more. The application is still under progress and is not fully complete. 

1) The tasks and bugs do not have endDate input for the user yet, therefore all tasks and bugs will show N/A end date.(Working)
2) Roles does not work fully yet. In future updates, only admins and owner can delete the tasks and bugs. 
3) User profile will be added soon and members will be displayed in profile cards rather than listing. 


