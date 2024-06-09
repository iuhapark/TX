import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../model/product";
import { SaveAPI, productStatusAPI, findAllProductAPI } from "./product-api";

export const saveProduct: any = createAsyncThunk(
  "product/saveProduct",
  async (product: IProduct) => await SaveAPI(product)
);

export const productStatus: any = createAsyncThunk(
  "/product/productStatus",
  async (product: IProduct, { rejectWithValue }) =>
    await productStatusAPI(product)
);

export const findAllProducts: any = createAsyncThunk(
  "product/findAllProducts",
  async (page: number) => {
    console.log('findAllProducts page: '+page)
    const data:any = await findAllProductAPI(page);

    const {message, result}:any = data
    return data
  }
);