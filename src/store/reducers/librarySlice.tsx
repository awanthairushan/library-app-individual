import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthor, IBook, UpdateAuthor, UpdateBook} from "../../types/dataTypes";

interface InitialState { //PascalCase
    authors: IAuthor[],
    updateAuthorIndex: number,
    books: IBook[],
    updateBookIndex: number,
}

const initialState: InitialState = {
    authors: [],
    updateAuthorIndex: -1,
    books: [],
    updateBookIndex: -1,
}

const librarySlice = createSlice({
    name: 'Library',
    initialState,
    reducers: {
        addAuthor: (state, action: PayloadAction<IAuthor>) => {
            state.authors = [...state.authors, action.payload];
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
        },
        addBook: (state, action: PayloadAction<IBook>) => {
            state.books = [...state.books, action.payload];
        },
        deleteBook: (state, action: PayloadAction<number>) => {
            const updatedBooks: IBook[] = state.books.slice();
            updatedBooks.splice(action.payload, 1);
            state.books = updatedBooks;
        },
        updateBook: (state, action: PayloadAction<UpdateBook>) => {
            const updatedBooks: IBook[] = state.books.slice();
            updatedBooks.splice(action.payload.updateBookIndex, 1, action.payload.book);
            state.books = updatedBooks;
        },
        updateBookIndex: (state, action: PayloadAction<number>) => {
            state.updateBookIndex = action.payload;
        },
    }
});

export const {
    addAuthor,
    deleteAuthor,
    updateAuthor,
    updateAuthorIndex,
    addBook,
    deleteBook,
    updateBook,
    updateBookIndex
} = librarySlice.actions;

export default librarySlice.reducer;