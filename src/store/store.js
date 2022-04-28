import { createSlice, configureStore } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    lists: [
      {
        id: 1,
        name: "list1",
      },

      {
        id: 2,
        name: "list2",
      },
    ],
    tasks: [
      {
        id: 11,
        title: "go to shop 11",
        description: "go to shop 11 description",
        listId: 1,
      },
      {
        id: 22,
        title: "task 22",
        description: "task  2222222 222222 description",
        listId: 1,
      },
      {
        id: 111,
        title: "task 11",
        description: "task 111 description",
        listId: 2,
      },
      {
        id: 222,
        title: "task 2",
        description: "task 222 description",
        listId: 2,
      },
      {
        id: 333,
        title: "task 3",
        description: "task 333 description",
        listId: 2,
      },
    ],
    loading: false,
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteTask: (state, action) => {
      let { tasks } = state;
      state.tasks = tasks.filter((t) => t.id !== action.payload.id);
    },
    deleteList: (state, action) => {
      let { lists } = state;
      state.lists = lists.filter((t) => t.id !== action.payload.id);
    },
    editTask: (state, action) => {
      let { tasks } = state;
      state.tasks = tasks.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    editList: (state, action) => {
      let { lists } = state;
      state.lists = lists.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    loading: (state) => {
      state.loading = true;
    },
    isNotLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  addTask,
  deleteTask,
  deleteList,
  editTask,
  addList,
  editList,
  loading,
  isNotLoading,
} = taskSlice.actions;

export const store = configureStore({
  reducer: taskSlice.reducer,
});
