import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import {IAuthor, UpdateAuthor} from '../../types/dataTypes';
import Swal, {SweetAlertResult} from "sweetalert2";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {addAuthor, deleteAuthor, updateAuthor} from "../../store/reducers/librarySlice";

const Authors: React.FC = () => {

    const authors = useAppSelector((state) => state.library.authors);

    const dispatch = useAppDispatch();

    const [updateAuthorIndex, setUpdateAuthorIndex] = useState<number | null>(null);
    const [updateAuthorName, setUpdateAuthorName] = useState<IAuthor | null>(null);

    const handleOnDeleteAuthor = (deleteIndex: number) => {
        Swal.fire({
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Author deleted successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    const handleOnSubmitAuthor = (author: IAuthor) => {
        dispatch(addAuthor(author));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Author added successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleOnUpdateAuthor = (updateIndex: number) => {
        handleOnAddAuthorClick();
        setUpdateAuthorIndex(updateIndex);
        setUpdateAuthorName(authors[updateIndex]);
    }

    const handleOnUpdateAuthorClick = (author: IAuthor) => {
        if (updateAuthorIndex !== null) {
            const updateAuthorTempory: UpdateAuthor = {
                author: author,
                updateAuthorIndex: updateAuthorIndex
            };
            dispatch(updateAuthor(updateAuthorTempory));
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Author updated successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleOnAddAuthorClick = () => {
        setIsFormVisible(true);
        setUpdateAuthorIndex(null);
    }
    const handleOnCloseAuthorClick = () => {
        setIsFormVisible(false)
    }

    return (
        <React.Fragment>
            <Row className="authors">
                <Col className="px-0">
                    <h1 className="pb-1">Authors</h1>
                </Col>
            </Row>
            <Row>
                <Col className="ps-0">
                    <AuthorList handleOnUpdateAuthor={handleOnUpdateAuthor}
                                handleOnDeleteAuthor={handleOnDeleteAuthor}/>
                </Col>
            </Row>
            <Row className="px-0">
                <Col className="authors px-0">
                    <Plus className="plus_icon align-top me-1" onClick={handleOnAddAuthorClick}/>
                    <label onClick={handleOnAddAuthorClick}>Add Author</label>
                </Col>
            </Row>
            <Row className="px-0 pt-5">
                <Col>
                    {isFormVisible && <AuthorForm onCloseClick={handleOnCloseAuthorClick}
                                                  onCreateClick={handleOnSubmitAuthor}
                                                  updateAuthorIndex={updateAuthorIndex}
                                                  updateAuthor={updateAuthorName}
                                                  onUpdateClick={handleOnUpdateAuthorClick}
                    />}
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;