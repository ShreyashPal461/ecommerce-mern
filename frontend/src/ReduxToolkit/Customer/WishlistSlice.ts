import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { type Wishlist, type WishlistState } from "../../types/wishlistTypes";
import { api } from "../../Config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk<Wishlist | null, void, { rejectValue: string }>(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt || jwt === "null" || jwt === "undefined") return null;

      const response = await api.get(`/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("wishlist fetch ", response.data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.log("error ", error);
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk<Wishlist, { productId: number }, { rejectValue: string }>(
  "wishlist/addProductToWishlist",
  async (
    { productId },
    { rejectWithValue }
  ) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt || jwt === "null" || jwt === "undefined") {
        return rejectWithValue("Please login to add wishlist items");
      }

      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        { },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(" add product ", response.data);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  }
);

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getWishlistByUserId
    builder.addCase(getWishlistByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getWishlistByUserId.fulfilled,
      (state, action: PayloadAction<Wishlist | null>) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getWishlistByUserId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch wishlist";
      }
    );

    // addProductToWishlist
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addProductToWishlist.fulfilled,
      (state, action: PayloadAction<Wishlist>) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      addProductToWishlist.rejected,
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add product to wishlist";
      }
    );
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
