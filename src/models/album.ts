import { Schema, Types, model } from 'mongoose'

export interface IAlbum {
    name: string
    artist: string
    description: string
    category: Array<Types.ObjectId>
    price: number
    stock_count: number
    url: string
}

const AlbumSchema = new Schema<IAlbum>({
    name: { type: String, required: true },
    artist: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 100 },
    category: { type: [Schema.Types.ObjectId], ref: 'Category', required: true },
    price: { type: Number, min: 1, max: 10000, required: true },
    stock_count: { type: Number, min: 1, max: 10000 },
})

AlbumSchema.virtual('url').get(function () {
    return `/store/album/${this._id}`
})

AlbumSchema.virtual('price_currency').get(function() {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
    })
    return formatter.format(this.price / 100);
});

export default model<IAlbum>('Album', AlbumSchema)
