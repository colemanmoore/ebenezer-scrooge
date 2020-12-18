import Model from './model'
export const AccountModel = new Model('accounts', [
    'user_id',
    'balance'
], {
    user_id: String,
    balance: Number
})
