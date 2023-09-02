import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            reqiured: true
        },
        author: {
            type: String,
            reqiured: true
        },
        publishYear: {
            type: Number,
            reqiured: true
        },
    },
    {
        timestamps: true
    }
);

export const Book = mongoose.model("Book", bookSchema)