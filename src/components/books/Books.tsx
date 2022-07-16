import React, {useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Plus} from 'react-feather';
import BookList from './BookList';
import BookFormSection from "./BookFormSection";
import {useAppDispatch} from "../../store/hooks";
import {updateBookIndex} from "../../store/reducers/librarySlice";

const Books: React.FC = () => {

    const dispatch = useAppDispatch();

    const [isFormVisible, setIsFormVisible] = useState(false);

    //open book form by clicking Add Author button
    const handleOnAddBookClick = () => {
        setIsFormVisible(true);
        dispatch(updateBookIndex(-1));
    }

    //close book form by clicking close button
    const handleOnCloseBookClick = () => {
        setIsFormVisible(false)
    }

    return (
        <Row>
            <Col xs={12} className='books px-0'>
                <h1 className="pb-1">Books</h1>
            </Col>
            <Col xs={12} className="ps-0">
                <BookList/>
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
                />}
            </Col>
        </Row>
    )
}

export default Books;