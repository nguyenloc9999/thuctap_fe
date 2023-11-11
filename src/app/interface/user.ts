export interface IUser {
    user?: any
    _id?: number | string;
    name?: string;
    email?: string;
    password?: string
    confirmpassword?: string
    address?: string
    image?: IImage | any
    role?: string
}
export interface IImage {
    url: string;
    publicId: string;
}