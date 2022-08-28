import React from "react";
import {Row,Col} from 'react-bootstrap';
import {Edit,Trash2} from 'react-feather';
import {IBook} from '../../types/dataTypes';
import SweetAlert from "sweetalert2";
import {deleteBook, updateBookIndex} from "../../store/reducers/librarySlice";
import {useAppDispatch} from "../../store/hooks";

type BookProps = {
    book: IBook;
    index: number;
}

const Book: React.FC<BookProps> = (props) => {

    const dispatch = useAppDispatch()

    const handleOnUpdateClick = (updateIndex: number) => {
        dispatch(updateBookIndex(updateIndex));
    }

    const handleOnDeleteClick = (deleteIndex: number) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBook(deleteIndex))
                SweetAlert.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'Book deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {})
            }
        })
    }

    return (
        <Row className="book py-2">
            <Col xs={9} className="px-0">
                <label>{props.index+1} . {props.book.name}</label>
            </Col>
            <Col xs={3} className="d-flex justify-content-end icon_area px-0">
                <Edit className="text-warning edit mt-1" onClick={() => handleOnUpdateClick(props.index)}/>
                <Trash2 className="text-danger trash2 mt-1" onClick={() => handleOnDeleteClick(props.index)}/>
            </Col>
        </Row>
    )
}

export default Book;