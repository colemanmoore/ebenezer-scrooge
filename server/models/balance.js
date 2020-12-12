import mongoose from 'mongoose';

const BalanceSchema = new mongoose.Schema({
  _id: String,
  value: Number,
  userId: String
}, {
  collection: 'Balance', // indicates the collection name in the MongoDB
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

export default function(db) {
  return db.model('Balance', BalanceSchema)
}
