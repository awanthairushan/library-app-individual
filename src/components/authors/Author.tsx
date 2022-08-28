import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {Edit, Trash2} from 'react-feather';
import {IAuthor} from '../../types/dataTypes';
import SweetAlert, {SweetAlertResult} from "sweetalert2";
import {deleteAuthor, updateAuthorIndex} from "../../store/reducers/librarySlice";
import {useAppDispatch} from "../../store/hooks";

type AuthorProps = {
    author: IAuthor
    index: number
}

const Author: React.FC<AuthorProps> = (props) => {

    const dispatch = useAppDispatch();

    const {author, index} = props;

    const handleOnUpdateAuthorClick = (updateIndex: number) => {
        dispatch(updateAuthorIndex(updateIndex));
    }

    const handleOnDeleteAuthorClick = (deleteIndex: number) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                dispatch(deleteAuthor(deleteIndex));
                SweetAlert.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Author deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {})
            }
        })
    }

    return (
        <Row className="author py-2">
            <Col xs={9} className="px-0">
                <label>{index + 1} . {author.name}</label>
            </Col>
            <Col xs={3} className="d-flex justify-content-end icon_area px-0">
                <Edit className="text-warning edit mt-1" onClick={() => handleOnUpdateAuthorClick(index)}/>
                <Trash2 className="text-danger trash2 mt-1" onClick={() => handleOnDeleteAuthorClick(index)}/>
            </Col>
        </Row>
    );
}

export default Author;