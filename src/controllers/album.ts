import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import Album from '../models/album'
import Category from '../models/category'

// Home Page
export const index = async (_: Request, res: Response) => {
    try {
        const albumCount = await Album.countDocuments()
        const categoryCount = await Category.countDocuments()
        const results = {
            albumCount,
            categoryCount,
        }
        res.render('index', { title: 'Music Store', data: results })
    } catch (err) {
        res.render('index', { title: 'Music Store', error: err })
    }
}

// Display list of all Albums
export const album_list = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const albums = await Album.find({}, 'name artist')
            .sort({ name: 1 })
            .populate('category')
        res.render('album_list', { title: 'All Albums', album_list: albums })
    } catch (err) {
        next(err)
    }
}

// Display info page for a specific Album
export const album_info = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const albumInfo = await Album.findById(req.params.id).populate(
            'category'
        )
        res.render('album_info', {
            data: albumInfo,
        })
    } catch (err) {
        next(err)
    }
}

// Display Album create form on GET
export const album_create_get = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await Category.find()
        res.render('album_form', {
            title: 'Add album',
            categories,
        })
    } catch (err) {
        next(err)
    }
}

// Handle Album create on post
export const album_create_post = [
    (req: Request, _: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.category)) {
            req.body.category =
                typeof req.body.category === 'undefined'
                    ? []
                    : [req.body.category]
        }
        next()
    },

    // Validate and sanitize
    body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('artist', 'Artist must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body('category.*').escape(),
    body('stock', 'Stock must not be empty').isNumeric().escape(),
    body('price', 'Price must not be empty').isNumeric().escape(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        const album = new Album({
            name: req.body.name,
            artist: req.body.artist,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
        })

        if (errors.isEmpty()) {
            try {
                await album.save()
                res.redirect(album.url)
            } catch (err) {
                next(err)
            }
        } else {
            try {
                const categories = await Category.find()
                res.render('album_form', {
                    title: 'Create Album',
                    categories,
                    album,
                    errors: errors.array(),
                })
            } catch (err) {
                next(err)
            }
        }
    },
]

// Display Album delete form on GET
export const album_delete_get = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const album = await Album.findById(req.params.id)

        if (album == null) {
            res.redirect('/store/albums')
        }

        res.render('album_delete', {
            title: `Delete ${album?.name}?`,
            album,
        })
    } catch (err) {
        next(err)
    }
}

// Handle Album delete on POST
export const album_delete_post = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const album = await Album.findById(req.params.id)
        if (album != null) {
            await Album.findByIdAndDelete(req.body.albumid)
        }

        res.redirect('/store/albums')
    } catch (err) {
        next(err)
    }
}

// Display Album update form on GET.
export const album_update_get = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const album = await Album.findById(req.params.id).populate('category')
        const categories = await Category.find()

        if (album == null) {
            throw new Error('Album not found')
        }

        res.render('album_form', {
            title: 'Update Album',
            album,
            categories,
        })
    } catch (err) {
        next(err)
    }
}

// Handle Album update on POST.
export const album_update_post = [
    (req: Request, _: Response, next: NextFunction) => {
        if (!Array.isArray(req.body.category)) {
            req.body.category =
                typeof req.body.category === 'undefined'
                    ? []
                    : [req.body.category]
        }
        next()
    },

    // Validate and sanitize
    body('name', 'Name must not be empty').trim().isLength({ min: 1 }).escape(),
    body('artist', 'Artist must not be empty')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty')
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body('category.*').escape(),
    body('stock', 'Stock must not be empty').isNumeric().escape(),
    body('price', 'Price must not be empty').isNumeric().escape(),

    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        const album = new Album({
            name: req.body.name,
            artist: req.body.artist,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            _id: req.params.id,
        })

        if (errors.isEmpty()) {
            try {
                const updatedAlbum = await Album.findByIdAndUpdate(
                    req.params.id,
                    album,
                    {}
                ).exec()
                if (updatedAlbum) {
                    res.redirect(updatedAlbum.url)
                }
            } catch (err) {
                next(err)
            }
        } else {
            try {
                const categories = await Category.find()
                res.render('album_form', {
                    title: 'Update Album',
                    categories,
                    album,
                    errors: errors.array(),
                })
            } catch (err) {
                next(err)
            }
        }
    },
]
