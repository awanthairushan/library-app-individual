import React, {useState, useEffect} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap';
import Select from "react-select";
import {IAuthor, IBook, IAuthorNameOption, UpdateBook} from "../../types/dataTypes";
import BookFormHeader from "./BookFormHeader";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addBook, updateBook} from "../../store/reducers/librarySlice";
import Swal from "sweetalert2";

type BookFormProps = {
    onCloseClick: () => void
}

const BookFormSection: React.FC<BookFormProps> = (props) => {

    const dispatch = useAppDispatch()

    const authors = useAppSelector(state => state.library.authors);
    const books = useAppSelector(state => state.library.books);
    const updateBookIndex = useAppSelector((state) => state.library.updateBookIndex)

    const [validated, setValidated] = useState(false);
    const [bookName, setBookName] = useState<string>("");
    const [isbn, setIsbn] = useState<string>();
    const [authorName, setAuthorName] = useState<IAuthorNameOption | null>(null);

    const authorNameOptions: IAuthorNameOption[] = authors.map((author: IAuthor) => {
        return (
            {value: author.name, label: author.name}
        )
    })

    const handleOnBookNameChange = (bookName: string) => {
        setBookName(bookName);
    }

    const handleOnISBNChange = (isbn: string) => {
        setIsbn(isbn);
    }

    const handleOnAuthorNameChange = (author: IAuthorNameOption | null) => {
        if (author != null) {
            setAuthorName(author);
        }
    }

    useEffect(() => {
        if (updateBookIndex === -1) {
            return;
        } else {
            const updateAuthorName = {
                value: books[updateBookIndex].authorName,
                label: books[updateBookIndex].authorName
            }
            setBookName(books[updateBookIndex].name);
            setIsbn(books[updateBookIndex].isbn);
            setAuthorName(updateAuthorName);
        }
    }, [updateBookIndex])

    //send data to Books component for adding book to book list
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            if (bookName != undefined && isbn != undefined && authorName != undefined) {
                const book: IBook = {name: bookName, isbn: isbn, authorName: authorName.value}
                if (updateBookIndex === -1) {
                    dispatch(addBook(book));
                    Swal.fire({
                        position: 'top-start',
                        icon: 'success',
                        title: 'Book added successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    const updateBookTemporary: UpdateBook = {
                        book: book,
                        updateBookIndex: updateBookIndex,
                    };
                    dispatch(updateBook(updateBookTemporary));
                    Swal.fire({
                        position: 'top-start',
                        icon: 'success',
                        title: 'Book updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
            setBookName("");
            setIsbn("");
            setAuthorName(null);
        }
    }

    //adding styles to react-select
    const customStyles = {
        container: (provided: any, state: any) => ({
            ...provided,
            borderRadius: '0',
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            border: '2px solid #8c8c8c',
            borderRadius: '0',
            display: 'flex',
            padding: '0',
            paddingBottom: '5px',
            minHeight: '34px',
            height: '34px',
        }),
        menu: (provided: any, state: any) => ({
            ...provided,
            position: 'flex-box',
            border: '1px solid #a9a9a9',
        }),
    }

    return (
        <Row>
            <Col lg={9} md={12} className="pe-4">
                <BookFormHeader onCloseClick={props.onCloseClick}/>
            </Col>
            <Col lg={9} md={12} className="pe-4">
                <Row className="book_form pt-3 ">
                    <Col className="pe-0 ms-lg-4 me-md-2">
                        <Form noValidate validated={validated} className="" id="Book_form" onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label className="px-0 mb-0">Name of Book</Form.Label>
                                <Form.Control type="text" className="form_control px-0" size="sm" value={bookName}
                                              required
                                              onChange={(event) =>
                                                  handleOnBookNameChange(event.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Book Name is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="px-0 mb-0 mt-3">ISBN</Form.Label>
                                <Form.Control type="number" className="form_control px-0" size="sm" value={isbn}
                                              required onChange={(event) =>
                                    handleOnISBNChange(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    ISBN is required.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="px-0 m-0 mt-3">Author</Form.Label>
                                <Select className="form_control px-0 m-0"
                                        options={authorNameOptions}
                                        styles={customStyles}
                                        value={authorName}
                                        isClearable={true}
                                        onChange={(event: IAuthorNameOption | null) => {
                                            handleOnAuthorNameChange(event)
                                        }}
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
                        <Button variant="primary" className="px-4 fs-6 create_button" size="sm" type="submit"
                                form="Book_form">{updateBookIndex === -1 ? "Create" : "Update"}</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BookFormSection;