# How to Setup a Basic MERN Stack using Docker

MERN’ is an acronym made up of the following set of technologies, namely, MongoDB, Express, React, and Node.js. 

- MongoDB: It is a document-oriented scalable NoSQL database. It is a flexible platform that enables users to create tables, schemas, and much more. 
- Express.js: Layered on top of NodeJS, this modular framework supports the backend framework and makes it simpler to write the backend code. It helps in designing better APIs and web applications.
- React.js: It is a front-end framework used for creating user interfaces. 
- Node.js: It is a JavaScript run-time environment that allows users to run the code on the server. It supports Node Pack Manager (npm), which is a combination of thousands of public and private node modules that are free to download.

## Technical Stack

- React(Frontend)
- Backend(Node.js and Express)
- Database(MongoDB)


## Getting Started 

### Steps to run in development mode:-

- Clone the repo 

```
 git clone https://github.com/Open-Source-Chandigarh/mern-stack-docker
```

- Build and Bring up MERN Stack

```
cd mern-stack-docker
docker-compose up -d --build
```

Access the app using `http://localhost:3000`

## Local Development

1. Fork the repository
2. Make sure you have `npm` Node.js & MongoDB installed in your system.
3. [Only once] Run (in the first_appp) `npm install` and `cd backend && npm install`.
4. Open two terminal windows (one for running Server and other for the UI).
5. Run `nodemon server.js` to start the server. By default it will run on `port 5000`.
6. For it will open on a new tab on `port 3000`.
7. Go to `http://localhost:3000` to see the application running.

## Note:

Only login and register model is created yet. 

## ToDoList

- Improvement over the homepage
