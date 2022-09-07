import { Schema, model } from 'mongoose'

export interface ICategory {
    name: string
    description: string
    url: string
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, maxlength: 100 },
})

CategorySchema.virtual('url').get(function () {
    return `/store/category/${this._id}`
})

const Category = model<ICategory>('Category', CategorySchema)

export default Category
