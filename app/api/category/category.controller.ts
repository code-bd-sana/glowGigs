import { Types } from "mongoose";
import jobModel from "../jobs/job.model";
import Category from "./category.model";

interface CategoryInput {
  name: string;
  description?: string;
  image: string;
}

// ✅ Get all categories
export const getAllCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

// ✅ Create a new category
export const createCategory = async (data: CategoryInput) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new Error("Category already exists");

  const newCategory = new Category(data);
  return await newCategory.save();
};

// ✅ Delete category by ID
export const deleteCategory = async (id: string) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new Error("Category not found");
  return deleted;
};

// ✅ Get jobs by category ID
export const getJobsByCategory = async (categoryId: string) => {
  console.log(categoryId);
  // Validate categoryId
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new Error("Invalid category ID");
  }

  const jobs = await jobModel
    .find({ category: new Types.ObjectId(categoryId) })
    .sort({ createdAt: -1 });
  return jobs;
};
