import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReduceer';

// Создаем хранилище
const store = configureStore({
  reducer: rootReducer
});

// Определяем тип состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
