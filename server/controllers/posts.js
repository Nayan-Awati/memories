import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async(req, res) => {
    try {
        const postMesages = await PostMessage.find()
        res.status(200).json(postMesages)
    }catch(e) {
        res.status(404).json({message: e.message})
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(e) {
        res.status(409).json({message: e.message})
    }
}

export const updatePost = async(req, res) => {
    try{
        const {id: _id} = req.params 
        const post = req.body 
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No post with that id!!")
        const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post}, _id, {new: true})
        res.json(updatedPost)
    } catch(e) {
        console.log(e)
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
