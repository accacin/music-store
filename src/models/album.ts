import { Schema, Types, model } from 'mongoose'

export interface IAlbum {
    name: string
    artist: string
    description: string
    category: Types.ObjectId
    price: number
    stock_count: number
}

const AlbumSchema = new Schema<IAlbum>({
    name: { type: String, required: true },
    artist: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 100 },
    category: { type: Schema.Types.ObjectId },
    price: { type: Number, min: 1, max: 10000 },
    stock_count: { type: Number, min: 1, max: 10000 },
})

AlbumSchema.virtual('url').get(function () {
    return `/album/${this._id}`
})

export default model<IAlbum>('Album', AlbumSchema)
