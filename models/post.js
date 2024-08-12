const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
        user : {
            type: mongoose.Schema.Types.ObjectId , ref: "user" },//users post create karnage to unki hi id hogi 
        date:{
            type: Date,
            default: Date.now
        }, 
        content: String,
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, ref:"user" //jo post like karega uski id hogi yaha
            }
        ]
    });

module.exports = mongoose.model("post",postSchema)