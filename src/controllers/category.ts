import { Response, Request } from 'express'

// Display list of all categories
export const category_list = (req: Request, res: Response) => {
    res.send('NOT IMPLEMENTED: Category list')
}

// Display detail page for a specific category.
export const category_detail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`);
};

// Display category create form on GET.
export const category_create_get = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category create GET');
};

// Handle category create on POST.
export const category_create_post = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category create POST');
};

// Display category delete form on GET.
export const category_delete_get = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category delete GET');
};

// Handle category delete on POST.
export const category_delete_post = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category delete POST');
};

// Display category update form on GET.
export const category_update_get = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category update GET');
};

// Handle category update on POST.
export const category_update_post = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: category update POST');
};
