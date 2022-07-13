import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthor, UpdateAuthor} from "../../types/dataTypes";
import {useState} from "react";

interface initialStateType {
    authors: IAuthor[],
    updateAuthorIndex: number
}

const initialState: initialStateType = {
    authors: [],
    updateAuthorIndex: -1
}

const librarySlice = createSlice({
    name: 'Library',
    initialState,
    reducers: {
        addAuthor: (state, action: PayloadAction<IAuthor>) => {
            const newAuthors = [...state.authors, action.payload];
            state.authors = newAuthors;
        },
        deleteAuthor: (state, action: PayloadAction<number>) => {
            const updatedAuthors: IAuthor[] = state.authors.slice();
            updatedAuthors.splice(action.payload, 1);
            state.authors = updatedAuthors;
        },
        updateAuthor: (state, action: PayloadAction<UpdateAuthor>) => {
            const updatedAuthors: IAuthor[] = state.authors.slice();
            updatedAuthors.splice(action.payload.updateAuthorIndex, 1, action.payload.author);
            state.authors = updatedAuthors;
        },
        updateAuthorIndex: (state, action: PayloadAction<number>) => {
            state.updateAuthorIndex = action.payload;
        }
    }
});

export const {addAuthor, deleteAuthor, updateAuthor, updateAuthorIndex} = librarySlice.actions;

export default librarySlice.reducer;