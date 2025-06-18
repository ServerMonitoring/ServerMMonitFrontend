import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: localStorage.getItem('theme') == "true"?true:false || true// true - черная тема, false - белая тема
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      const root = document.documentElement;
      localStorage.setItem('theme', `${state.isDarkMode}`)
      if (state.isDarkMode){
        root.style.setProperty("--primary-color", "#28a745");
        root.style.setProperty("--secondary-color", "#17a2b8");
        root.style.setProperty("--background-color", "#1e1e1e");
        root.style.setProperty("--card-background", "#2d2d2d");
        root.style.setProperty("--text-color", "#ffffff");
        root.style.setProperty("--shadow", "0 4px 12px rgba(0, 0, 0, 0.2)");
      } else {
        root.style.setProperty("--primary-color", "#4349fd");
        root.style.setProperty("--secondary-color", "#00ddff");
        root.style.setProperty("--background-color", "#ffffff");
        root.style.setProperty("--card-background", "#f9f9f9");
        root.style.setProperty("--text-color", "#333333");
        root.style.setProperty("--shadow", "0 4px 12px rgba(0, 0, 0, 0.2)");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;