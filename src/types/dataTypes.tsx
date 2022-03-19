export interface IAuthor {
    name:string;
}
export interface IBook {
    name:string;
    isbn: string;
    authorName: string;
}
export interface AuthorNameOption {
    value: string;
    label: string;
}