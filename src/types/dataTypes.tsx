export interface IAuthor {
    id: string
    name: string;
}

export interface IBook {
    id: string;
    name: string;
    isbn: string;
    author: IAuthor;
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