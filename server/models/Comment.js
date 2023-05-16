import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    author: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model('Comment', CommentSchema)
