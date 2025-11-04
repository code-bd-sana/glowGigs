import mongoose, { Schema, Document, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  image: string; // 👈 new image field
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true, // 👈 make it required if every category must have an image
    },
  },
  { timestamps: true }
);

const Category =
  models.Category || mongoose.model<ICategory>("Category", categorySchema);

export default Category;
