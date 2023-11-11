export interface IBlog {
  _id?: string;
  description?: string;
  author?: string;
  title?: string;
  image?: IImage | any;
  createdAt?: string;
  updatedAt?: string;
}
export interface IImage {
  url: string;
  publicId: string;
}