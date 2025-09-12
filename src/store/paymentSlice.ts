import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { initiateCheckout } from "@/services/pay";
import { ProductPayload } from "@/types/Pay";

// Types
export interface CheckoutData {
  products: ProductPayload[];
  checkoutState: string;
  timestamp: number;
}

export interface PaymentState {
  checkoutData: CheckoutData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PaymentState = {
  checkoutData: null,
  loading: false,
  error: null,
};

// Async thunk for initiating checkout
export const initiateCheckoutThunk = createAsyncThunk(
  "payment/initiateCheckout",
  async (products: ProductPayload[], { rejectWithValue }) => {
    try {
      const response = await initiateCheckout(products);

      return {
        products,
        checkoutState: response.checkoutState,
        timestamp: Date.now(),
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Checkout failed"
      );
    }
  }
);

// Payment slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Clear checkout data
    clearCheckoutData: (state) => {
      state.checkoutData = null;
      state.error = null;
    },

    // Set checkout data manually (if needed)
    setCheckoutData: (state, action: PayloadAction<CheckoutData>) => {
      state.checkoutData = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initiate checkout
      .addCase(initiateCheckoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateCheckoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload;
        state.error = null;
      })
      .addCase(initiateCheckoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { clearCheckoutData, setCheckoutData, clearError } =
  paymentSlice.actions;

// Export reducer
export default paymentSlice.reducer;

// Selectors
export const selectPaymentState = (state: { payment: PaymentState }) =>
  state.payment;
export const selectCheckoutData = (state: { payment: PaymentState }) =>
  state.payment.checkoutData;
export const selectPaymentLoading = (state: { payment: PaymentState }) =>
  state.payment.loading;
export const selectPaymentError = (state: { payment: PaymentState }) =>
  state.payment.error;
