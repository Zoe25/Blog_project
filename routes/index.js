var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host : process.end.DB_HOST,
//   user : process.env.DB_USER,
//   password: process.end.DB_PASSWORD,
//   database: process.env.DB_NAME
// })

// connection.connect()

// HTMLModElement.exports = connection;

//can import code directly from file
var Posts = require('../db.json');

// Get Login Page
router.get('/login', function(req, res, next){
  res.render('login', {title:'Login'});
});

/* GET home page. */
router.get('/', function(req, res, next){
  
  request ({
    url:"http://localhost:8000/posts?_sort=id&_order=desc" +req.params.id,
    json:true
  }, function(error, response, body){
    res.render('index', { title: "Estella's Book Blog",posts:body});
  });
});

/* GET blog page. */
router.get('/blog', function(req, res, next){
  res.render('blog', { title: "Estella's Book Blog",posts:Posts.posts});
}); 
/* GET archive page */
router.get('/archive', function(req, res, next) {
  res.render('archive', { title: "Estella's Book Blog - Archives",posts:Posts.posts} );
});

// GET delete posts via archive page
router.get('/delete/:id', function(req, res, next){
  // console.log(req.params.id)
  // make a post request to our database
  request ({
    url:"http://localhost:8000/posts/" +req.params.id,
    method: "DELETE",
  }, function(error, response, body){
    let data = {
      message: 'Successfully Removed.'
    }

    res.redirect('/');
  });
});

// GET delete posts via archive page
router.get('/delete/:id', function(req, res, next){
  // console.log(req.params.id)
  // make a post request to our database
  request ({
    url:"http://localhost:8000/posts/" +req.params.id,
    method: "DELETE",
  }, function(error, response, body){
    let data = {
      message: 'Successfully Removed.'
    }

    res.redirect('/');
  });
});

/* GET home page. */
router.get('/blog/:id', function(req, res, next){

  let postVal = req.path.slice(-1);

  res.render('blog', { title: "Estella's Book Blog", posts:Posts.posts[postVal -1]});
});

/* GET home page. */
router.get('/edit/:id', function(req, res, next){

  let postVal = req.path.slice(-1);

  res.render('edit', { title: "Estella's Book Blog", posts:Posts.posts[postVal -1]});
});

// GET delete posts via archive page
router.get('/edit/:id', function(req, res, next){
  // console.log(req.params.id)
  // make a post request to our database
  request ({
    url:"http://localhost:8000/posts/" +req.params.id,
    method: "POST",
  }, function(error, response, body){
    let data = {
      message: 'Successfully Removed.'
    }

    res.redirect('/');
  });
});


// // GET delete posts via archive page
// router.get('/edit/:id', function(req, res, next){
//   // console.log(req.params.id)
//   // make a post request to our database
//   request ({
//     url:"http://localhost:8000/posts/" +req.params.id,
//     method: "DELETE",
//   }, function(error, response, body){
//     let data = {
//       message: 'Successfully Removed.'
//     }

//     res.redirect('/');
//   });
// });

/* GET contact page */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
});

/* GET new.ejs page */
router.get('/new', function(req, res, next) {
  res.render('new', { title: "Estella's Book Blog" });
});

/* post new page */
router.post('/new', function(req, res, next) {
  //res.send(req.body);
  //create variable to posts

  let obj = {
    "title": req.body.title,
    "author": req.body.author,
    "date": req.body.date,
    "time" : req.body.time,
    "content": req.body.content,
    "image": req.body.image
  }

  //write logic that saves this data
  request.post({
    url:"http://localhost:8000/posts",
    body: obj,
    json: true
  }, function (error,responsive,body){
    //what to send when function has finished
    // res.post(body);
    res.redirect('/');
  });
});

/* GET edit page. */
router.get('/:pokeId', function(req, res, next) {

    //make a post request to our database
    request({
    uri: "http://localhost:8000/pokemon/" + req.params.pokeId,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        //send a response message
        res.render('edit', {message: false, poke: JSON.parse(body)});
    });
  
});

router.post('/:pokeId', function(req, res, next) {

    // console.log(req.body)
    //make a post request to our database
    request({
    uri: "http://localhost:8000/pokemon/"+ req.params.pokeId,
    method: "POSTS",
    form: {
        name: req.body.name,
        image: req.body.image_url,
    }
    }, function(error, response, body) {
        // console.log(body);
        //send a response message
        res.render('edit', {message: 'Successfully Added.', poke: JSON.parse(body)});
    });
})

module.exports = router;
