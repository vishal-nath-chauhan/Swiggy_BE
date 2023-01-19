import { Schema, model, SchemaTypes, Document } from "mongoose";

export enum PaymentStatus {
    FAILED = 'FAILED',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    REFUNDED = 'REFUNDED',
    PROCESSING = 'PROCESSING',
    CANCELLED = 'CANCELLED',
}

export enum PaymentGateway {
    RAZORPAY = 'RAZORPAY',
    STRIPE = 'STRIPE',
    VENDOR = 'VENDOR',
}



export interface IOrder extends Document {
    payment_status: string;
    txn_id: string;
    gateway: string;
    user: string;
    rPay: {
        payment: any,
        response: any

    },
    restaurant: string;
    _id: string;
    __v: any;
}

const OrderSchema = new Schema<IOrder>({

    txn_id: String,
    payment_status: {
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
        index: true
    },
    gateway: {
        type: String,
        enum: PaymentGateway,
        default: PaymentGateway.RAZORPAY,

    },
    rPay: {
        payment: {},
        response: {}

    },
    restaurant: SchemaTypes.ObjectId,
    user: SchemaTypes.ObjectId
});

const Orders = model("order", OrderSchema);
export default Orders;
