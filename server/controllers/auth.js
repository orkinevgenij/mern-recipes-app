import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' })
}

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.json({
        message: 'Данный e-mail уже занят',
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await User.create({
      email,
      password: hash,
    })
    const token = createToken(newUser._id)
    res.status(200).json({
      newUser,
      token,
      message: 'Регистрация прошла успешно',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Не удалось зарегистрироваться',
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        message: 'Пользователь не найден',
      })
    }
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) {
      return res.json({
        message: 'Неверный логин или пароль',
      })
    }
    const token = createToken(user._id)

    res.status(200).json({
      user,
      token,
      message: 'Успешный вход пользователя',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Нет доступа',
    })
  }
}
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({
        message: 'Такого пользователя не существует',
      })
    }
    const token = createToken(user._id)
    res.status(200).json({
      user,
      token,
      message: 'Успешный вход пользователя',
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Нет доступа',
    })
  }
}
