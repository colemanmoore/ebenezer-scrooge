import Model from './model'
export const EntryModel = new Model('entries', [
    'user_id',
    'date',
    'title',
    'money'
], {
    user_id: String,
    date: Date,
    title: String,
    money: Number
})
