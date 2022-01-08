import { Schema, model } from "mongoose";

const RequestLogsSchema = new Schema({
    path: String,
    params: {},
});

module.exports = model("request_logs", RequestLogsSchema);