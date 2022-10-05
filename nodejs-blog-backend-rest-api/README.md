
# Blog Backend

A Blog backend built using express server, mongoDB atlas is used to store the data 

## Getting Started

### Running this Project Locally
```
add a ``.env`` file inside the root folder
```
DATABASE_URL=local_moongodb
PORT=3000
```

### Supported Routes

```
/blogs : (method:get) - to get all blogs 
/blogs : (method:post) - to post blog
/blogs?author&random - query this endpoint to get all the property based blogs
/blogs/id : (method:get) - to get a single blog of using _id (mongoose id)
```

## Steps to Host on Heroku

[refer this gist](https://gist.github.com/ialtafshaikh/8336df5d417109b12c46bd20ccda4e17)

