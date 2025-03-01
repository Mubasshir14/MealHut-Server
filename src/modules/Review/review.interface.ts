import { Schema } from "mongoose";

export type TReview = {
    reviewText: string;
    email?: string;
    name: string;
    model: string;
    image: string;
    rating: number;
    //* not include
    meal: Schema.Types.ObjectId;
}