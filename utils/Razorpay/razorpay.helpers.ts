import Razorpay from 'razorpay'

const initiateRazorpay = () => new Razorpay({
    key_id: process.env.RPAY_KEY,
    key_secret: process.env.RPAY_SECRET,
});


export const createRazorpayOrder = async (data: any) => {

    const options = {
        currency: "INR",
        amount: data.amount,
        notes: [],
        receipt: data.txn_id
    }

    const razorpayOrder = await initiateRazorpay().orders.create(options, (error: any, response: any) => {
        console.log({ error, response });

    })
    return razorpayOrder
}

export default initiateRazorpay