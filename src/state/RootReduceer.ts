import { combineReducers } from '@reduxjs/toolkit';
import languageReducer from './slice/languageSlice';
import themeReducer from './slice/themeSlice';
import authReducer from './slice/authslice'; // Новый слайс

const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  auth: authReducer, // Добавляем новый редюсер
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;