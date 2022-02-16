import mongoose from 'mongoose';
const { Schema } = mongoose;

const cardsSchema = new Schema({
    name : String,
    imageUrl : String,
});

export default mongoose.model('Cards', cardsSchema);
