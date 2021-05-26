/**
 * Model for a new snippet.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const codeSnippet = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'You have to provide a name for your code snippet.'],
    maxlength: [100, 'That name is a bit too long.']
  },

  prefix: {
    type: String
  },

  body: {
    type: String
  },

  description: {
    type: String
  }
})
