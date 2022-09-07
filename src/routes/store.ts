import { Router } from 'express'
export const storeRouter = Router()

// Require controller modules
import {
    index,
    album_list,
    album_info,
    album_create_get,
    album_create_post,
} from '../controllers/album'
import {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
} from '../controllers/category'

// ALBUM ROUTES

// Get store home page
storeRouter.get('/', index)

// GET requeest for creating an album
storeRouter.get('/album/create', album_create_get)

// POST request for creating an album
storeRouter.post('/album/create', album_create_post)

// GET request for all albums
storeRouter.get('/album', album_list)

// GET request for album info page
storeRouter.get('/album/:id', album_info)

// CATEGORY ROUTES

// GET requeest for creating an category
storeRouter.get('/category/create', category_create_get)

// POST request for creating an category
storeRouter.post('/category/create', category_create_post)

// GET request for a category
storeRouter.get('/category/:id', category_detail)

// GET request for all categories
storeRouter.get('/category/', category_list)
