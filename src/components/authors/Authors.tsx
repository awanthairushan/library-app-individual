import React, { useState } from 'react';
import {Row,Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import AuthorForm from './AuthorForm';
import {Plus} from 'react-feather';
import Swal from 'sweetalert2';
import {IAuthor} from '../../types/dataTypes';

const authorsArray: IAuthor[] = [
    {name : "Awantha Irushan"},
    {name : "Kavini Sahasra"},
]

const Authors: React.FC = () => {

    const [authors,setAuthors] = useState(authorsArray);
    const [updateAuthorIndex,setUpdateAuthorIndex] = useState<number | null>(null);
    const [updateAuthor,setUpdateAuthor] = useState<IAuthor | null>(null);

    const handleOnDeleteAuthor = (deleteIndex:number) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
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

    const handleOnSubmitAuthor = (name: IAuthor) => {
        const allAuthors: IAuthor[] = authors.slice();
        allAuthors.push(name);
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
        //console.log(updateAuthorIndex);
        // need to add a function to add data to array
        if (updateAuthorIndex !== null) {
            const allAuthors: IAuthor[] = authors.slice();
            allAuthors.splice(updateAuthorIndex,1,updatedAuthor);
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

    const [isFormVisible,setIsFormVisible] = useState(false);

    const handleOnCloseAuthorClick = () => {
        setIsFormVisible(false)
    }

    const handleOnAddAuthorClick = () => {
        setIsFormVisible(true);
        setUpdateAuthorIndex(null);
    }


    return (
        <React.Fragment>
            <Row className="authors">
                <Col className="px-0">
                    <h1 className="border-bottom-5-dark pb-1">Authors</h1>
                </Col>
            </Row>
            <Row>
                <Col>
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
                    {isFormVisible && <AuthorForm onCloseClick={handleOnCloseAuthorClick} onCreateClick={handleOnSubmitAuthor} updateAuthorIndex={updateAuthorIndex} updateAuthor={updateAuthor} onUpdateClick={handleOnUpdateAuthorClick}/>}
                </Col>
            </Row>
        </React.Fragment>
    );
}
export default Authors;