import { Schema } from "mongoose";

export type TReview = {
    userName?: string;
    comment: string;
    rating: number;
    mealId: Schema.Types.ObjectId;
}