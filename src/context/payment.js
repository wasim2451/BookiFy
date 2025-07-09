import Razorpay from "razorpay"
import axios from "axios";
export const paymentFunction=async(object)=>{
    // All Payment code to be written here !
    console.log(object);
    const res=await axios.post('http://localhost:3000/api/createorder',object);
    console.log(res);
    return res.data.orderID;
}