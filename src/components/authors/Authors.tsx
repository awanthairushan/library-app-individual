import React, {useContext, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import {IAuthor} from '../../types/dataTypes';
import Swal, {SweetAlertResult} from "sweetalert2";
import {DataContext} from "../../contexts/DataContext";

type AuthorsProps = {
    authors: IAuthor[];
    setAuthors: (authors: IAuthor[]) => void
}

const Authors: React.FC<AuthorsProps> = (props) => {

    const {postData, getData, deleteData, putData} = useContext(DataContext)

    const [isRenderComponent, setIsRenderComponent] = useState<boolean>(false);
    const [updateAuthor, setUpdateAuthor] = useState<IAuthor | null>(null);

    useEffect(() => {
        const connect = async () => {
            if (getData) {
                const response: any = await getData('/api/author');
                if (response?.data?.data) {
                    props.setAuthors(response?.data?.data)
                }
            }
        }
        connect();
    }, [getData, isRenderComponent])

    const handleOnDeleteAuthor = (deleteId: string) => {
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
                    const response: any = await deleteData('/api/author/' + deleteId);
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

    const handleOnSubmitAuthor = async (author: IAuthor) => {
        if (postData) {
            const response: any = await postData('/api/author', author);
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

    const handleOnUpdateAuthor = (author: IAuthor) => {
        handleOnAddAuthorClick();
        setUpdateAuthor(author);
    }

    const handleOnUpdateAuthorClick = async (updatedAuthor: IAuthor) => {
        if (putData) {
            const response: any = await putData('/api/author/' + updatedAuthor.id, updatedAuthor);
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
        setUpdateAuthor(null)
    }

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleOnAddAuthorClick = () => {
        setIsFormVisible(true);
        setUpdateAuthor(null);
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
                    <AuthorList authors={props.authors} handleOnUpdateAuthor={handleOnUpdateAuthor}
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
                                                  updateAuthor={updateAuthor}
                                                  onUpdateClick={handleOnUpdateAuthorClick}
                    />}
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;