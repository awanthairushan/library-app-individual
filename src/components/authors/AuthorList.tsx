import React,{} from 'react';
import {Row,Col} from 'react-bootstrap';
import Author from './Author';
import {IAuthor} from '../../types/dataTypes';

    type AuthorListProps = {
        authors: IAuthor[];
        handleOnDeleteAuthor: (deleteIndex:number) => void
    }

const AuthorList: React.FC<AuthorListProps> = (props) => {



    const renderAuthors = () => {
        if(props.authors.length === 0) {
            return (
                <li>
                   <label>Not available</label>
                </li>
            );
        } else {
            return (
                <li>
                    {
                        props.authors.map( (author:IAuthor, index:number) =>
                         <Author author={author} index={index} key = {index} onDeleteClick={props.handleOnDeleteAuthor}/>
                        )
                    }
                </li>
            )
        }

    }


    return (
        <Row className = "author_list my-2">
            <Col>
                <ul className="list-unstyled">
                    {renderAuthors()}
                </ul>
            </Col>
        </Row>
    );
}

export default AuthorList;