#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
)

// Get arguments passed on command line
var userArgs = process.argv.slice(2)
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
import async from 'async'
import Album, { IAlbum } from './src/models/album'
import Category, { ICategory } from './src/models/category'
import mongoose from 'mongoose'

var mongoDB = userArgs[0]
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

var albums: IAlbum[] = []
var categories: ICategory[] = []

function categoryCreate(name: string, description: string, cb: any) {
    const categoryDetail = { name, description }

    var category = new Category(categoryDetail)

    category.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Category: ' + category)
        categories.push(category)
        cb(null, category)
    })
}

function albumCreate(
    name: string,
    artist: string,
    description: string,
    category: ICategory,
    price: number,
    stock_count: number,
    cb: any
) {
    const albumDetail = {
        name,
        artist,
        description,
        category,
        price,
        stock_count,
    }
    var album = new Album(albumDetail)
    album.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Album: ' + album)
        albums.push(album)
        cb(null, album)
    })
}

function createCategories(cb: any) {
    async.series(
        [
            function (callback: any) {
                categoryCreate('Black Metal', 'Time for relaxing', callback)
            },
            function (callback: any) {
                categoryCreate('RetroWave', '80s stuff', callback)
            },
            function (callback: any) {
                categoryCreate('Funk', 'Funky beats are a treat', callback)
            },
            function (callback: any) {
                categoryCreate('Punk', 'Fuck da system', callback)
            },
        ],
        // optional callback
        cb
    )
}
function createAlbums(cb: any) {
    async.parallel(
        [
            function (callback: any) {
                albumCreate(
                    'Black Metal',
                    'Venom',
                    'One of the first black metal bands',
                    categories[0],
                    1599,
                    1,
                    callback
                )
            },
            function (callback: any) {
                albumCreate(
                    'Transilvanian Hunger',
                    'Darkthrone',
                    'Fantastic',
                    categories[0],
                    1899,
                    2,
                    callback
                )
            },
            function (callback: any) {
                albumCreate(
                    'Monsters',
                    'The Midnight',
                    'One of the first black metal bands',
                    categories[0],
                    1599,
                    1,
                    callback
                )
            },
            function (callback: any) {
                albumCreate(
                    'Magnatron III',
                    'NewRetroWave',
                    'Not even listened to this yet...',
                    categories[1],
                    1199,
                    10,
                    callback
                )
            },
            function (callback: any) {
                albumCreate(
                    'Mark Ronson',
                    'Uptown Special',
                    'Apparently the 40th best funk album out there..',
                    categories[2],
                    1599,
                    1,
                    callback
                )
            },
            function (callback: any) {
                albumCreate(
                    'Never Mind the Bollocks',
                    'Sex Pistols',
                    'One of the first black metal bands',
                    categories[3],
                    1599,
                    4,
                    callback
                )
            },
        ],
        // Optional callback
        cb
    )
}

async.series(
    [createCategories, createAlbums],
    // Optional callback
    function (err: any, _: any) {
        if (err) {
            console.log('FINAL ERR: ' + err)
        } else {
            console.log('Albums: ' + albums)
        }
        // All done, disconnect from database
        mongoose.connection.close()
    }
)
