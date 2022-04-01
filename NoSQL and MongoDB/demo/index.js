const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/testdb';
const Post = require('./models/Post');
const Comment = require('./models/Comment');
start();

async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log('Database connected');


    // const comment = await Comment.findOne({})
    // const post = await Post.findOne({});
    // post.comments.push(comment);
    // post.save()
     const post = await Post.findOne({}).populate('comments');
     console.log(post);


}