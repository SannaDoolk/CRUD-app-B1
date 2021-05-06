/**
 * Model for registration.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
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

export const registration = mongoose.model('Registration', schema)
