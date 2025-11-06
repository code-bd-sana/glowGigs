import mongoose, { Schema, model, models, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  image: string;
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
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Type-safe export to avoid "expression is not callable" error
const Category: Model<ICategory> =
  (models.Category as Model<ICategory>) || model<ICategory>("Category", categorySchema);

export default Category;
