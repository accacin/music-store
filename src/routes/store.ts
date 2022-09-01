import { Router } from 'express'
export const storeRouter = Router()

// Require controller modules
import { index, album_list, album_info } from '../controllers/album'
import { category_list, category_detail } from '../controllers/category'

// ALBUM ROUTES

// Get store home page
storeRouter.get('/', index)

// GET request for album info page
storeRouter.get('/album/:id', album_info);

// GET request for all albums
storeRouter.get('/album', album_list);

// CATEGORY ROUTES

// GET request for a category
storeRouter.get('/category/:id', category_detail);

// GET request for all categories
storeRouter.get('/category/', category_list);
