import React, {useContext, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Plus} from 'react-feather';
import BookList from './BookList';
import BookFormSection from "./BookFormSection";
import {IAuthor, IBook} from '../../types/dataTypes';
import Swal, {SweetAlertResult} from "sweetalert2";
import {DataContext} from "../../contexts/DataContext";

type BooksProps = {
    authors: IAuthor[]
}
const Books: React.FC<BooksProps> = (props) => {

    const {postData, getData, deleteData, putData} = useContext(DataContext)

    const [isRenderComponent, setIsRenderComponent] = useState<boolean>(false);
    const [books, setBooks] = useState<IBook[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [updateBook, setUpdateBook] = useState<IBook | null>(null);

    useEffect(() => {
        const connect = async () => {
            if (getData) {
                const response: any = await getData('/api/book');
                if (response?.data?.data) {
                    setBooks(response?.data?.data)
                }
            }
        }
        connect();
    }, [getData, isRenderComponent, props.authors])

    //open book form by clicking Add Author button
    const handleOnAddBookClick = () => {
        setIsFormVisible(true);
        setUpdateBook(null);
    }

    //close book form by clicking close button
    const handleOnCloseBookClick = () => {
        setIsFormVisible(false)
    }

    //adding a book by clicking create button
    const handleOnSubmitBookClick = async (book: IBook) => {
        if (postData) {
            const response: any = await postData('/api/book', book);
            if (response?.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsRenderComponent(!isRenderComponent);
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    //open book form and display book details which need to be edited by clicking edit icon in the bookList
    const handleOnUpdateClick = (updateBook: IBook) => {
        handleOnAddBookClick();
        setUpdateBook(updateBook);
    }

    //update the book by clicking update button
    const handleOnUpdateBookClick = async (updatedBook: IBook) => {
        if (putData) {
            const response: any = await putData('/api/book/' + updatedBook.id, updatedBook);
            if (response?.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsRenderComponent(!isRenderComponent);
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: response?.data?.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
        setUpdateBook(null)
    }

    //delete a book by clicking delete icon in bookList
    const handleOnDeleteClick = (deleteId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result: SweetAlertResult) => {
            if (result.isConfirmed) {
                if (deleteData) {
                    const response: any = await deleteData('/api/book/' + deleteId);
                    if (response?.status === 200) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: response?.data?.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setIsRenderComponent(!isRenderComponent);
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: response?.data?.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            }
        })
    }

    return (
        <Row>
            <Col xs={12} className='books px-0'>
                <h1 className="pb-1">Books</h1>
            </Col>
            <Col xs={12} className="ps-0">
                <BookList books={books} onDeleteClick={handleOnDeleteClick}
                          onUpdateClick={handleOnUpdateClick}
                />
            </Col>
            <Col xs={12} className="books px-0">
                <Plus className="plus_icon align-top me-1"
                      onClick={handleOnAddBookClick}
                />
                <label onClick={handleOnAddBookClick}>Add Book</label>
            </Col>
            <Col xs={12} className="mt-5">
                {isFormVisible && <BookFormSection
                    onCloseClick={handleOnCloseBookClick}
                    books={books} authors={props.authors}
                    onCreateClick={handleOnSubmitBookClick}
                    onUpdateClick={handleOnUpdateBookClick}
                    updateBook={updateBook}
                />}
            </Col>
        </Row>
    )
}

export default Books;