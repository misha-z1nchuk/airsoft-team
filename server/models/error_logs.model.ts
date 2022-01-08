import { Schema, model } from "mongoose";

const ErrorSchema = new Schema({
    path: String,
    params: {},
    errorDescription: String,
    status: Number,
});

module.exports = model("error_logs", ErrorSchema);