const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();


mongoose.connect("mongodb+srv://admin:R4aD7dEGNEyZM8Ij@cluster0.pnqxp.mongodb.net/mean-course?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});

app.post("/api/posts", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });

});


app.put("/api/posts/:id", (req, res, next) =>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Update successful!'});
    });
})

app.get('/api/posts',(req, res, next) => {
  // const posts = [
  //   {
  //     id: '001',
  //     title: 'First server-side post',
  //     content: 'This is coming from the server!'
  //   },
  //   {
  //     id: '002',
  //     title: 'Second server-side post',
  //     content: 'This is coming from the server!!'
  //   }
  // ];

  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    })
    .catch();
});


app.delete("/api/posts/:id", (req, res, next) => {
  // console.log(req.params.id);

  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json( {message: "Post deleted!" });
  });

});



module.exports = app;
