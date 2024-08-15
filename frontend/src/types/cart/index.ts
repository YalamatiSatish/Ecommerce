import { productType } from "../common";
import { ErrorDetail } from "../products";

export interface CartSlice {
    loading : 'idle' | 'loading' |'succeeded' | 'failed';
    cartItems : productType[] ;
    error: ErrorDetail;
};

