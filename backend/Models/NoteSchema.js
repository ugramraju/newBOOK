const mongoose = require("mongoose");
const NoteSchema = mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique: true
        
    },
    description:{
        type: String,
        required:true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("notes", NoteSchema)