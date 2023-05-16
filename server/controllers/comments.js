import Comment from '../models/Comment.js'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

export const createComment = async (req, res) => {
  try {
    const { id, comment } = req.body
    const user = await User.findById(req.userId)
    if (!comment)
      return res.json({
        message: 'Комментарий не может быть пустой',
      })

    const { email } = user
    const newComment = await Comment.create({ comment, author: email })

    try {
      await Recipe.findByIdAndUpdate(id, {
        $push: { comments: newComment },
      })
    } catch (error) {
      console.log(error)
    }
    res.json(newComment)
  } catch (error) {
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const getOneComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    res.json(comment)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Коммента не существует',
    })
  }
}

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!comment) {
      return res.json({ message: 'Комментарий не найден' })
    }

    res.json({ comment, message: 'Комментарий обновлен' })
  } catch (error) {
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}

export const removeComment = async (req, res) => {
  const { id } = req.params
  try {
    await Comment.findByIdAndDelete(id)
    await Recipe.findOneAndUpdate(
      { comments: id },
      {
        $pull: { comments: id },
      },
    )

    res.json({
      test,
      message: 'Комментарий удален',
    })
  } catch (error) {
    res.json({
      message: 'Что-то пошло не так',
    })
  }
}
