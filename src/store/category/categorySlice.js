import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, PREFIX_PRODUCT } from "../../const";

const initialState = {
  category: [],
  error: '',
  activeCategory: 0,
}

export const categoryRequestAsync = createAsyncThunk(
  'category/fetch', () => fetch(`${API_URL}${PREFIX_PRODUCT}/category`)
    .then(req => req.json())
    .catch(error => ({ error }))
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload.indexCategory
    }
  },
  extraReducers: builder => {
    builder
      .addCase(categoryRequestAsync.pending, state => {
        state.error = ''
      })
      .addCase(categoryRequestAsync.fulfilled, (state, action) => {
        state.error = '';
        state.category = action.payload
      })
      .addCase(categoryRequestAsync.rejected, (state, action) => {
        state.error = action.payload.error
      });
  }
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;