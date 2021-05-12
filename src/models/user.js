/**
 * Model for a new user.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [10, 'The password must contain at least 10 characters.'],
    required: true
  }
})

UserSchema.pre('save', async function () {
  this.password = await bcryptjs.hash(this.password, 8)
  console.log('hashed')
})

export const User = mongoose.model('User', UserSchema)
