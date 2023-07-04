export interface IAuthor {
    id: string
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

export type DataContextProps = {
    getData?: (url: string) => void;
    postData?: (url: string, body: any) => void;
    putData?: (url: string, body: any) => void;
    deleteData?: (url: string) => void;
}