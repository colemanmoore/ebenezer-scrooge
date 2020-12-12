import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  userId: String,
  balance: Number
}, { collection: 'Accounts' });

export default function(db) {
  return db.model('Account', AccountSchema)
}
