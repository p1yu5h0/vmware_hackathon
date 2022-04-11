import mongoose from 'mongoose';

const {Schema} = mongoose;
const notesSchema = Schema({
    text : {
        type : String,
        required : true
    },
    analysis : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Analysis'
    }
},  { timestamps: true });

const Note = mongoose.models.Note || mongoose.model('Note', notesSchema);

export default Note;
