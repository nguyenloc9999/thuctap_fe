export interface IProduct {
    _id?: string,
    name?: string,
    author?: string,
    price?: number,
    image?: IImage | any,
    description?: string
    categoryId?: string,
    category?: string
    quantity?: number | any
    productId?: string,
    status?: string
}
export interface IImage {
    url: string;
    publicId: string;
}