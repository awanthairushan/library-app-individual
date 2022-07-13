import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthor , UpdateAuthor} from "../../types/dataTypes";

interface initialStateType {
    authors: IAuthor[],
}

const initialState: initialStateType = {
    authors: [],
}

const librarySlice = createSlice({
    name: 'Library',
    initialState,
    reducers: {
        addAuthor: (state, action:PayloadAction<IAuthor>) => {
            const newAuthors = [...state.authors, action.payload];
            state.authors = newAuthors;
        },
        deleteAuthor: (state, action:PayloadAction<number>) => {
            const updatedAuthors: IAuthor[] = state.authors.slice();
            updatedAuthors.splice(action.payload, 1);
            state.authors = updatedAuthors;
        },
        updateAuthor: (state, action:PayloadAction<UpdateAuthor>) => {
            const updatedAuthors: IAuthor[] = state.authors.slice();
            updatedAuthors.splice(action.payload.updateAuthorIndex, 1, action.payload.author);
            state.authors = updatedAuthors;
        }
    }
});

export const {addAuthor,  deleteAuthor , updateAuthor} = librarySlice.actions;

export default librarySlice.reducer;