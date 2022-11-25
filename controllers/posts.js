
const Order = require("../models/Post");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      
      //const posts = await Order.find({ user: req.user.id });
      res.render("profile.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const pending = await Post.find({isCompleted: 'pending'})
      const completed = await Post.find({isCompleted: 'completed'})
      
      res.render("feed.ejs", {pending: pending, completed: completed});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const pending = await Post.find({isCompleted: 'pending'})
      const completed = await Post.find({isCompleted: 'completed'})
      
      res.render("post.ejs", {pending: pending, completed: completed});
    } catch (err) {
      console.log(err);
    }
  },
  completeOrder: async (req, res) => {
    try {

      await Post.findOneAndUpdate({ _id: req.params.id }, {isCompleted: 'completed', barista: req.user.userName});
      console.log("Post has been added!");
      res.redirect("/post");
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {

      await Order.create({
        name: req.body.name,
        temp: req.body.temp,
        
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      
      
      
      
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/post");
    } catch (err) {
      res.redirect("/post");
    }
  },
};
