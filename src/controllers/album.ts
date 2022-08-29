import { Request, Response } from 'express'

// Home Page
export const index = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Site Home Page')
}

// Display list of all Albums
export const album_list = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album list')
}

// Display info page for a specific Album
export const album_info = (req: Request, res: Response) => {
    res.send(`NOT IMPLEMENTED: Album info: ${req.params.id}`)
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
export const album_delete_get = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album delete GET')
}

// Handle Album delete on POST
export const album_delete_post = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album delete POST')
}

// Display Album update form on GET.
export const author_update_get = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album update GET')
}

// Handle Album update on POST.
export const author_update_post = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Album update POST')
}
