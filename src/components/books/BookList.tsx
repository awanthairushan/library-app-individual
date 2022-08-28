import React from "react";
import {Row, Col} from "react-bootstrap";
import {IBook} from "../../types/dataTypes";
import Book from './Book'
import {useAppSelector} from "../../store/hooks";

const BookList: React.FC = () => {

    const books = useAppSelector((state) => state.library.books);

    const renderBooks = () => {
        if (books.length === 0) {
            return (
                <li>
                    <label className='fst-italic'>No books listed here.</label>
                </li>
            );
        } else {
            return (
                <li className="book-list_item">
                    {
                        books.map((book: IBook, index: number) =>
                            <Book book={book} index={index} key={index}/>
                        )
                    }
                </li>
            )
        }

    }

    return (
        <Row className="book-list my-3">
            <Col>
                <ul className="book-list_item list-unstyled mb-0 mx-0">
                    {renderBooks()}
                </ul>
            </Col>
        </Row>
    )
}

export default BookList;