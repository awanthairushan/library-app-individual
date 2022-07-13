import React, {} from 'react';
import {Row, Col} from 'react-bootstrap';
import Author from './Author';
import {IAuthor} from '../../types/dataTypes';
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const AuthorList: React.FC = () => {

    //call store and get authors name
    const dispatch = useAppDispatch()
    const authors = useAppSelector(state => state.library.authors)

    const renderAuthors = () => {
        if (authors.length === 0) {
            return (
                <li>
                    <label className='fst-italic'>No authors listed here.</label>
                </li>
            );
        } else {
            return (
                <li className="author_list_item">
                    {
                        authors.map((author: IAuthor, index: number) =>
                            <Author author={author} index={index} key={index}
                            />
                        )
                    }
                </li>
            )
        }

    }


    return (
        <Row className="my-3">
            <Col>
                <ul className="list-unstyled mb-0">
                    {renderAuthors()}
                </ul>
            </Col>
        </Row>
    );
}

export default AuthorList;