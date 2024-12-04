import { configureStore } from '@reduxjs/toolkit';

// Example slice reducer
import pieReducer from './Reducer/PieSlice';

export const store = configureStore({
  reducer: {
    chartData: pieReducer,
  },
});

// Type of the RootState for use in selectors
export type RootState = ReturnType<typeof store.getState>;

// Type of the dispatch function for use in components
export type AppDispatch = typeof store.dispatch;
