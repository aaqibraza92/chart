import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types/CategoryInterface';
import { Product } from '../types/ProductInterface';

  
interface PieChartState {
  allCategories: Category[];          // Array of all categories
  selectedCategory: string;     // Array of selected categories
  allProducts: Product[];            // Array of all products
  selectedProd: string[];       // Array of selected products
  totalCategories: number;          // Total number of categories
  totalProducts: number;            // Total number of products
}

// Define the initial state based on the type
const initialState: PieChartState = {
  allCategories: [],
  selectedCategory: "",
  allProducts: [],
  selectedProd: [],
  totalCategories: 0,
  totalProducts: 0,
};

// Create the slice
const PieSlice = createSlice({
  name: 'pieChart',
  initialState,
  reducers: {
    setAllCategories: (state, action: PayloadAction<Category[]>) => {
      state.allCategories = action.payload;
      state.totalCategories = action.payload.length;
    },
    setSelectedCategories: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
      state.totalProducts = action.payload.length;
    },
    selectedProd: (state, action: PayloadAction<string[]>) => {
      state.selectedProd = action.payload;
    },
    // addCategory: (state, action: PayloadAction<Category[]>) => {
    //   state.allCategories.push(action.payload);
    //   state.totalCategories += 1;
    // },
    // addProduct: (state, action: PayloadAction<string>) => {
    //   state.allProducts.push(action.payload);
    //   state.totalProducts += 1;
    // },
    clearSelections: (state) => {
      state.selectedCategory = "";
      state.selectedProd = [];
    },
  },
});

// Export the actions
export const {
  setAllCategories,
  setSelectedCategories,
  setAllProducts,
  selectedProd,
//   addCategory,
//   addProduct,
  clearSelections,
} = PieSlice.actions;

// Export the reducer
export default PieSlice.reducer;
