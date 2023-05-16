import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Layout } from './components/Layout'
import { AddRecipe } from './pages/AddRecipe/AddRecipe'
import { EditComment } from './pages/EditComment'
import { EditRecipe } from './pages/EditRecipe/EditRecipe'
import { FullRecipe } from './pages/FullRecipe/FullRecipe'
import { Login } from './pages/Login/Login'
import { Main } from './pages/Main/Main'
import { MyRecipes } from './pages/MyRecipes/MyRecipes'
import { Register } from './pages/Register/Register'
import { checkAuth, getMe } from './redux/features/auth/authSlice'
import './scss/index.scss'
import { PrivateRoute } from './utils/privateRoute'
import { PopularRecipes } from './pages/PopularRecipes/PopularRecipes'
import { InfoPage } from './pages/InfoPage/InfoPage'
function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkAuth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Main />} />
          <Route element={<PrivateRoute />}>
            <Route path='recipes/addrecipe' element={<AddRecipe />} />
            <Route path='recipes/myrecipes' element={<MyRecipes />} />
          </Route>
          <Route path='recipes/popular' element={<PopularRecipes />} />
          <Route path='recipes/:id' element={<FullRecipe />} />
          <Route path='recipes/:id/edit' element={<EditRecipe />} />
          <Route path='comments/edit/:id' element={<EditComment />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='recipes/info' element={<InfoPage />} />
        </Route>
      </Routes>
      <ToastContainer position='bottom-center' autoClose={1000} />
    </>
  )
}

export default App
