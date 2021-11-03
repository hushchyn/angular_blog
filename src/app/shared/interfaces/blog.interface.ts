import { ICategoryResponse } from "./category.interface";

export interface IBlogResponse{
    id: number,
    imgPath: string,
    category: ICategoryResponse,
    title: string,
    description: string
}