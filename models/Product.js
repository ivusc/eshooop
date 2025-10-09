"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    pictures: [{ type: String }],
}, { timestamps: true });
var Product = mongoose_1.models.Product || (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
