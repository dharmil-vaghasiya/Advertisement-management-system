const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const paymentlogSchema = {
    consid:{
        type:ObjectId,
        ref:"consignment"
    },
    paymentid: {
        type: String,
        default: ""
    },
    Amount: {
        type: Number,
        default: 0
    },
    paymentstatus: {
        type: Number,
        default: 0
    },
    order_id:{
        type: String,
        default:""
    },
    date:{
       type:String,
        
    },
    senderemail:{
        type:String
    },
    receiveremail:{
        type:String
    },
};

const paymentlog = mongoose.model("paymentlog", paymentlogSchema);

module.exports = paymentlog;
