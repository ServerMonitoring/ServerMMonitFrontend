import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
}

const savedLanguage = localStorage.getItem('language') || 'ru';

const initialState: LanguageState = {
  currentLanguage: savedLanguage,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem('language', action.payload); // Сохраняем в localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;