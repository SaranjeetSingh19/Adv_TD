import mongoose from 'mongoose';

import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(201).json({ success: true, posts: allProducts });
    // console.log(allProducts);
  } catch (error) {
    console.log(`Error in Fetching all Products ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;

  if (!product.title || !product.content) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`Error in Creating Product ${error}`);
    res.status(501).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Post Deleted! 🗑️" });
  } catch (error) {
    console.log(`Error in Deleting Product ${error}`);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({ success: true, post: updatedProduct });
  } catch (error) {
    console.log(`Error while updating Product: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
