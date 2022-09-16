import { Router } from 'express'
export const storeRouter = Router()

// Require controller modules
import {
    index,
    album_list,
    album_info,
    album_create_get,
    album_create_post,
    album_delete_get,
    album_delete_post,
    album_update_get,
    album_update_post,
} from '../controllers/album'
import {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
} from '../controllers/category'

// ALBUM ROUTES

// Get store home page
storeRouter.get('/', index)

// GET requeest for creating an album
storeRouter.get('/album/create', album_create_get)

// POST request for creating an album
storeRouter.post('/album/create', album_create_post)

// GET request for deleting a category
storeRouter.get('/album/:id/delete', album_delete_get)

// POST request for deleting a category
storeRouter.post('/album/:id/delete', album_delete_post)

// GET request for updating a category
storeRouter.get('/album/:id/update', album_update_get)

// POST request for updating a category
storeRouter.post('/album/:id/update', album_update_post)

// GET request for all albums
storeRouter.get('/album', album_list)

// GET request for album info page
storeRouter.get('/album/:id', album_info)

// CATEGORY ROUTES

// GET requeest for creating a category
storeRouter.get('/category/create', category_create_get)

// POST request for creating a category
storeRouter.post('/category/create', category_create_post)

// GET request for deleting a category
storeRouter.get('/category/:id/delete', category_delete_get)

// POST request for deleting a category
storeRouter.post('/category/:id/delete', category_delete_post)

// GET request for a category
storeRouter.get('/category/:id', category_detail)

// GET request for all categories
storeRouter.get('/category/', category_list)
