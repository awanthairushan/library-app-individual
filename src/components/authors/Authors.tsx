import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {updateAuthorIndex} from "../../store/reducers/librarySlice";

const Authors: React.FC = () => {

    const dispatch = useAppDispatch();

    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    //open Author form by clicking Add Author button
    const handleOnAddAuthorClick = () => {
        setIsFormVisible(true);
        dispatch(updateAuthorIndex(-1));
    }

    //close Author form by clicking close button
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
                    />
                    }
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;