import instance from "../../common/configs/axios-config";
import { IProduct } from "../model/product";

export const SaveAPI = async (product: IProduct) => {
    console.log(`Product API parameter: ${JSON.stringify(product)}`)
    try {
        const response = await instance().post("/product/save", product);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const productStatusAPI = async (product:IProduct) => {
    try{
        const response = await instance().post('/product/status',product)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}

export const findAllProductAPI = async (page: number) => {
    try {
        const response = await instance().get("product/list", {
            params: { page, limit: 10 },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}