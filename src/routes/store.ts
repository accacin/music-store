import { Router } from 'express'
export const storeRouter = Router()

// Require controller modules
import { index, album_list, album_info } from '../controllers/album'
import { category_list, category_detail } from '../controllers/category'

// ALBUM ROUTES

// Get store home page
storeRouter.get('/', index)

// GET requeset for album info page
storeRouter.get('/albums/:id', album_info);

// GET request for all albums
storeRouter.get('/albums', album_list);

// CATEGORY ROUTES

// GET request for a category
storeRouter.get('/categories/:id', category_list);

// GET request for a specific category
storeRouter.get('/categories/', category_detail);
