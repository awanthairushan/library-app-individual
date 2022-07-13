import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import {IAuthor, UpdateAuthor} from '../../types/dataTypes';
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const Authors: React.FC = () => {

    const authors = useAppSelector((state) => state.library.authors);
    const updateAuthorIndexTemp = useAppSelector((state) => state.library.updateAuthorIndex);

    const dispatch = useAppDispatch();

    const [updateAuthorIndex, setUpdateAuthorIndex] = useState<number | null>(null);
    const [updateAuthorName, setUpdateAuthorName] = useState<IAuthor | null>(null);

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    useEffect(() => {
        handleOnAddAuthorClick();
        setUpdateAuthorIndex(updateAuthorIndexTemp);
        setUpdateAuthorName(authors[updateAuthorIndexTemp]);
    }, [updateAuthorIndexTemp])

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
                    <AuthorList/>
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
                                                  updateAuthorIndex={updateAuthorIndex}
                                                  updateAuthor={updateAuthorName}
                    />
                    }
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;