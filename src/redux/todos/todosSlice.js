import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    return fetch(
      `https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`
    ).then((res) => res.json())
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {
    add(state, action) {
      state.list.push(action.payload)
    },
    del(state, { payload: index }) {
      state.list.length !== 1 ? state.list.splice(index - 1, 1) : state.list.splice(-1, 1);
    },
    updStatus(state, { payload: index }) {
      state.list.length !== 1 ? state.list[index - 1].status = 1 : state.list[index].status = 1;
    },
    updTodo(state, { payload }) {
      const getIndex = state.list.length !== 1 ? payload.id - 1 : payload.id;
      state.list[getIndex].title = payload.title;
      state.list[getIndex].description = payload.description;
      state.list[getIndex].status = payload.status;
      state.list[getIndex].createdAt = payload.createdAt;
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getTodos.fulfilled]: (state, { payload }) => {
      state.list = payload
      state.status = 'success'
    },
    [getTodos.rejected]: (state, action) => {
      state.status = 'failed'
    },
  },
})

export default todosSlice.reducer;
export const { add, del, updStatus, updTodo } = todosSlice.actions;
export const selectTodos = ({ todos }) => todos;
