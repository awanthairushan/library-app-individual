export interface IAuthor {
    name:string;
}
export interface IBook {
    name:string;
    isbn: string;
    authorName: string;
}
export interface IAuthorNameOption {
    value: string;
    label: string;
}

export interface UpdateAuthor {
    author: IAuthor;
    updateAuthorIndex: number;
}