const mongoose=require('mongoose')

const taskname=new mongoose.Schema({
    moviename:{
        type:String,
        required:true
    },
    hero:{
        type:String,
        required:true
    },
    releaseyear:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    poster:{
        type:String,
        required:true
    },

    date :{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('task',taskname)