import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      default: [],
    },
    category: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    email: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Recipe', RecipeSchema)
