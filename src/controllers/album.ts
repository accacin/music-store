import { Request, Response, NextFunction } from 'express'
import Album from '../models/album'
import Category from '../models/category'

// Home Page
export const index = async (req: Request, res: Response) => {
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
export const album_create_get = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album create GET')
}

// Handle Album create on post
export const album_create_post = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album create POST')
}

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
export const author_update_get = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album update GET')
}

// Handle Album update on POST.
export const author_update_post = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album update POST')
}
