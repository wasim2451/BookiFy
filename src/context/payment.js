import Razorpay from "razorpay"
import axios from "axios";
export const paymentFunction = async (object) => {
    // All Payment code to be written here !
    console.log(object);
    const res = await axios.post('https://lambent-florentine-b5d8b8.netlify.app/api/createorder', object);
    console.log(res);
    return res.data.orderID;
}

export const emailFunction = async (orderData) => {
    const status = await axios.post('https://lambent-florentine-b5d8b8.netlify.app/api/v1/send/email',orderData);
    console.log(status.data.check,"comes from Backend !"); // true or false
    return status.data.check;  
}