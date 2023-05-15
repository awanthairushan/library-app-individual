import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Plus} from 'react-feather';
import BookList from './BookList';
import BookFormSection from "./BookFormSection";
import {IAuthor, IBook} from '../../types/dataTypes';
import Swal from "sweetalert2";

type BooksProps = {
    authors: IAuthor[]
}
const Books: React.FC<BooksProps> = (props) => {
    const booksArray: IBook[] = [];
    const [books, setBooks] = useState<IBook[]>(booksArray);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [updateBookIndex, setUpdateBookIndex] = useState<number | null>(null);
    const [updateBook, setUpdateBook] = useState<IBook | null>(null);

    //open book form by clicking Add Author button
    const handleOnAddBookClick = () => {
        setIsFormVisible(true);
        setUpdateBookIndex(null);
    }

    //close book form by clicking close button
    const handleOnCloseBookClick = () => {
        setIsFormVisible(false)
    }

    //adding a book by clicking create button
    const handleOnSubmitBookClick = (book: IBook) => {
        const allBooks: IBook[] = books.slice();
        allBooks.push(book);
        setBooks(allBooks);
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Book added successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    //open book form and display book details which need to be edited by clicking edit icon in the bookList
    const handleOnUpdateClick = (updateIndex: number) => {
        handleOnAddBookClick();
        setUpdateBookIndex(updateIndex);
        setUpdateBook(books[updateIndex]);
    }

    //update the book by clicking update button
    const handleOnUpdateBookClick = (updatedBook: IBook) => {
        if (updateBookIndex !== null) {
            const allBooks: IBook[] = books.slice();
            allBooks.splice(updateBookIndex, 1, updatedBook);
            setBooks(allBooks);
        }
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Book updated successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    //delete a book by clicking delete icon in bookList
    const handleOnDeleteClick = (deleteIndex: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const allBooks: IBook[] = books.slice();
                allBooks.splice(deleteIndex, 1);
                setBooks(allBooks);
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'Book deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
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
                    updateBookIndex={updateBookIndex}
                    updateBook={updateBook}
                />}
            </Col>
        </Row>
    )
}

export default Books;