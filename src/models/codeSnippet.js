/**
 * Mongoose model for a new snippet.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const codeSnippetSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: [true, 'You have to provide a name for your code snippet.'],
    minlength: [1, 'You have to provide a name for your code snippet.'],
    maxlength: [100, 'That name is a bit too long.']
  },

  description: {
    type: String,
    required: true,
    maxlength: 10000
  }
})

export const CodeSnippet = mongoose.model('CodeSnippet', codeSnippetSchema)
