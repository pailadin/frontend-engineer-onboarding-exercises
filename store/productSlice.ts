import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface Product {
  title: string;
  image?: string;
  description?: string;
}

interface Products {
  products: Array<Product>;
  status?: string;
}

const INITIAL_STATE: Products = {
  products: [],
};

const getFakeProductData = createAsyncThunk('product/getFakeProductData', async () => {
  const response = await fetch('/api/fakeProductData');

  return response.json();
});

const productSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    clearProducts() {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [`${getFakeProductData.pending}`]: (state) => {
      state.status = 'loading';
    },
    [`${getFakeProductData.rejected}`]: (state) => {
      state.status = 'failed';
    },
    [`${getFakeProductData.fulfilled}`]: (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { setProducts, clearProducts } = productSlice.actions;
export { getFakeProductData };

export const getProducts = (state: RootState): Array<Product> => state.product.products;
export const getProductFetchStatus = (state: RootState): string | undefined => state.product.status;
