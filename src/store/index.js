import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../redux/todos/todosSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
})
