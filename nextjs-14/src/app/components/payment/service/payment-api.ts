import instance from "../../common/configs/axios-config";
import { IPayment } from "../model/payment";

export const SaveAPI = async (payment: IPayment) => {
    console.log(`Payment API parameter: ${JSON.stringify(payment)}`)
    try {
        const response = await instance().post("/payment/save", payment);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const paymentStatusAPI = async (payment:IPayment) => {
    try{
        const response = await instance().post('/payment/status',payment)
        // java 에서 Messenger.message에 값을 담음
        console.log(response.data)
        return response.data
    } 
    catch(error){
        console.log(error)
        return error
    }
}