/**
 * Model for a new user.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [1, 'A username is required'],
    maxlength: [25, 'The username must not contain more than 25 characters.'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [10, 'The password must contain at least 10 characters.'],
    maxlength: [1000, 'The password must not contain more than 1000 characters.'],
    required: [true, 'A password is required']
  }
})

userSchema.pre('save', async function () {
  this.password = await bcryptjs.hash(this.password, 8)
  console.log('hashed')
})

/**
 * 
 * @param 
 * @param
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcryptjs.compare(password, user.password))) {
    throw new Error('Invalid login attempt')
  }
  return user
}

export const User = mongoose.model('User', userSchema)
