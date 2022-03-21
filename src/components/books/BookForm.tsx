import React,{useState,useEffect} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap';
import {XCircle} from 'react-feather';
import Select from "react-select";
import {IAuthor, IBook, AuthorNameOption} from "../../types/dataTypes";
import authors from "../authors/Authors";
import {hover} from "@testing-library/user-event/dist/hover";

type BookFormProps = {
    onCloseClick : () => void
    books: IBook[];
    authors:IAuthor[];
    onCreateClick :(book: IBook) => void
    onUpdateClick:(book: IBook)=> void
    updateBookIndex: number | null;
    updateBook:IBook | null;
}


const BookForm : React.FC<BookFormProps> = (props) => {

    const [validated,setValidated] = useState(false);
    const [bookName,setBookName] = useState<string>("");
    const [isbn,setIsbn] = useState<string>();
    const [authorName,setAuthorName] = useState<AuthorNameOption | null>(null);

    const authorNameOptions: AuthorNameOption[] = props.authors.map((author: IAuthor) => {
        return(
            {value: author.name, label:author.name}
        )
    })

    const handleOnBookNameChange = (bookName:string) => {
        setBookName(bookName);
    }

    const handleOnISBNChange = (isbn:string) => {
        setIsbn(isbn);
    }

    const handleOnAuthorNameChange = (author: AuthorNameOption | null) => {
        if (author != null) {
            setAuthorName(author);
        }
    }

    useEffect(() => {
        if (!props.updateBook) {
            return;
        } else {
            const updateAuthorName = {value: props.updateBook.authorName, label:props.updateBook.authorName}
            setBookName(props.updateBook.name);
            setIsbn(props.updateBook.isbn);
            setAuthorName(updateAuthorName);
        }
    }, [props.updateBook])

    const customStyles = {
        container: (provided: any, state: any) => ({
            ...provided,
            border: '2px solid #8c8c8c',
            padding: '0',
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            border: "0px",
        }),
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            if (bookName != undefined && isbn != undefined && authorName != undefined) {
                const temporyBook: IBook = {name: bookName, isbn: isbn, authorName: authorName.value}
                if (props.updateBookIndex === null){
                    props.onCreateClick(temporyBook);
                } else {
                    props.onUpdateClick(temporyBook);
                }
            }
            setBookName("");
            setIsbn("");
            setAuthorName(null);
        }
    }

    return (
        <Row>
            <Col lg={9} md={12} className="pe-4">
                <Row className="book_form">
                    <Col xs={11} className="px-0">
                        <h2 className="px-0 fs-3">{props.updateBookIndex === null ? "Create" : "Update"} Book</h2>
                    </Col>
                    <Col xs={1} className="p-0 d-flex justify-content-end align-items-center">
                        <XCircle className="x_circle" onClick={props.onCloseClick}/>
                    </Col>
                </Row>
                <Row className="book_form pt-3 ">
                    <Col className="pe-0 ms-lg-4 me-md-2">
                        <Form noValidate validated={validated} className="" id="Book_form"  onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label className="px-0">Name of Book</Form.Label>
                                <Form.Control type="text" className="form_control px-0" size="sm" value={bookName} required onChange={(event) => handleOnBookNameChange(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Book Name is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="px-0">ISBN</Form.Label>
                                <Form.Control type="number" className="form_control px-0" size="sm" value={isbn} required onChange={(event) => handleOnISBNChange(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    ISBN is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>

                                <Form.Label className="px-0 m-0">Author</Form.Label>
                                <Select className="form_control px-0 m-0"
                                    options = {authorNameOptions}
                                    styles = {customStyles}
                                    value={authorName}
                                    isClearable={true}
                                    onChange={(event: AuthorNameOption | null) => {handleOnAuthorNameChange(event)}}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Author is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="book_form py-4 ">
                    <Col className="pe-0 d-flex justify-content-end me-md-2">
                        <Button variant="primary" className="px-4 py-1 fs-6 create_button" size="sm" type="submit" form="Book_form">{props.updateBookIndex === null ? "Create" : "Update"}</Button>
                    </Col>
                </Row>
            </Col>
            <Col lg={3} md={0}>

            </Col>
        </Row>
    );
}

export default BookForm;