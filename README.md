# NetGrowth

A full-stack web application that is used to create timed schedules for maintaining large professional network.

## Project Overview

One of the most challenging parts of being a student or an employee is having to keep track of a large network colleagues, alumni of a university, fellow students, or people you met at a conference. One of the most common advise I heard is that quality trumps quantity when it comes to networking. But why not have both at the same time? The idea behind NetGrowth is to allow people to use mere exposure effect to harness the maximum out of their networking experience. It allows user to add connections and allow to enter significant facts about their own life. Then, the algorithm uses multiple metrics such as helpfulness, communication effectiveness and engagement to assess how open or reciprocal is the connection is, reminding the user to either contact the person more or less frequently.

## Techology Used

### Database

The database of a choice is **MongoDB**. It is a popular NoSQL choice and integrates well into backend choice for this project (see below). It also allowed the author of the project to gain a exposure to NoSQL databases.

### Backend

The backend framework for this project is **Express**. Express is lightweight, general purpose framework that integrates well with MongoDB. Express connects to MongoDB via Mongoose. It also connects to Microsoft, GitHub and Google via OAuth, allowing users to login using existing accounts from those companies instead of creating new one. Website unique registration is also supported. The project uses Twillo to send emails to the user with reminders. The backend also uses Mocha for testing and achieves 85% test coverage.

### Frontend

The frontend framework of choice is **React**. It integrates well with Express and MongoDB forming a MERN stack. Frontend in this project also uses MaterialUI components for consistent styling across all of the components. As a security layer, the frontend makes use of reCAPTCHA 2.

### Containerization

The project uses **Docker**, specifically multi-container `docker-compose` setup.

## Installation

Docker daemon and git installation is required to run this project

In a new directory run,

`git init`  
`git pull https://github.com/SherikTZ/NetGrowth.git`

After git complete pull, run

`docker-compose up`
