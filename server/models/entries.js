import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  date: Date,
  title: String,
  money: Number,
  userId: String
}, { collection: 'Entries' });

export default function(db) {
  return db.model('Entry', EntrySchema)
}
