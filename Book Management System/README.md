# Book Database Management

This application helps in performing CRUD operations on a Book Database stored on MongoDB 

This is a Node.js Express application. 
- `Express` is a minimal web framework for Node.js that lets us define `handlers` (functions) for `routes` (URLs).
- The project uses `nodemon` so you don't have to restart the application everytime you make a change: it will automatically restart.
- `body-Parser` to read & display response in json form.
- `mongoose` for storing data in mongoDB and get and update the data

## Getting & Setting up the project

- Fork/Use this template to make your own Book Management System.
- `npm install` and `npm start` to run the project.
- `npm install` checks the `package.json` for the project's dependencies: these are the libraries and other modules that the project uses. `npm` will download and install any dependencies so that they are available for the project.
- `npm start` is a custom install script specified in `package.json`. Rather than starting the app with `node index.js`, we start it with `nodemon` so that the app automatically restarts whenever we change any code!
- Your application will now be running on `localhost:3000`. You can verify that by opening `localhost:3000` in your browser: you should see Book Management System home page.
- Check out the `src/routes` file to see what other routes are available to test. Remember, we can only test the GET routes in our browser!
- You may want to use `ngrok` to generate a public URL for the application if you plan to use the POST route, or to receive requests from outside your network.
- You can also use *Postman* to make requests.

## Resources for using the application

- A sample dataset has been added to the database already to perform the operations. [View Dataset](https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json)(Modified)
- Connect to the MongoDB database using this string in your application code `mongodb+srv://mongo:mongo@cluster0.4wds12x.mongodb.net/?retryWrites=true&w=majority`
- [Link](https://www.getpostman.com/collections/a308d5497655456101d9) to Postman Collection to perform operations easily.

Made with ❤️ by Rachit