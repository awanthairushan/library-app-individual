import React, { useState } from 'react';
import {Row,Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import {IAuthor} from '../../types/dataTypes';
import Swal, {SweetAlertResult} from "sweetalert2";

type AuthorsProps = {
    authors: IAuthor[];
    setAuthors: (authors:IAuthor[]) => void
}

const Authors: React.FC<AuthorsProps> = (props) => {

    const {authors,setAuthors} = props;

    const [updateAuthorIndex, setUpdateAuthorIndex] = useState<number | null>(null);
    const [updateAuthor, setUpdateAuthor] = useState<IAuthor | null>(null);

    const handleOnDeleteAuthor = (deleteIndex: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result:SweetAlertResult) => {
            if (result.isConfirmed) {
                const allAuthors: IAuthor[] = authors.slice();
                allAuthors.splice(deleteIndex, 1);
                setAuthors(allAuthors);
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
        const allAuthors: IAuthor[] = authors.slice();
        allAuthors.push(author);
        setAuthors(allAuthors);
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
        setUpdateAuthor(authors[updateIndex]);
    }

    const handleOnUpdateAuthorClick = (updatedAuthor: IAuthor) => {
        if (updateAuthorIndex !== null) {
            const allAuthors: IAuthor[] = authors.slice();
            allAuthors.splice(updateAuthorIndex, 1, updatedAuthor);
            setAuthors(allAuthors);
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
                    <AuthorList authors={authors} handleOnUpdateAuthor={handleOnUpdateAuthor} handleOnDeleteAuthor={handleOnDeleteAuthor} />
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
                                                  updateAuthor={updateAuthor}
                                                  onUpdateClick={handleOnUpdateAuthorClick}
                    />}
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;