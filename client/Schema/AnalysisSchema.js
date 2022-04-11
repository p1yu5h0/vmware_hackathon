import mongoose from 'mongoose';

const {Schema} = mongoose;
const analysisSchema = Schema({
    data : {
        type : String,
        required : true
    },
    notes : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Note'
        }],
    }
},{timestamps: true } )

const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema)


export default Analysis;