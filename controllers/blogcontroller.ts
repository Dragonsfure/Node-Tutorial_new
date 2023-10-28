import { Request, Response } from "express";
import { Blog } from "../models/blog";


const blog_index = (req: Request, res:Response) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req: Request, res:Response ) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      res.status(404).render("404", {title: "Blog not found"});
    });
}

const blog_create_get = (req: Request, res:Response ) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req: Request, res:Response ) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req: Request, res:Response ) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

export  {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
} 