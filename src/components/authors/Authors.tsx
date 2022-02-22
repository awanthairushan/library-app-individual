import React, { useState } from 'react';
import {Row,Col} from 'react-bootstrap';
import AuthorList from './AuthorList';
import {Plus} from 'react-feather';
import Swal from 'sweetalert2';
import {IAuthor} from '../../types/dataTypes';

    const authorsArray: IAuthor[] = [
            {name : "Awantha Irushan"},
            {name : "Kavini Sahasra"},
        ]

const Authors: React.FC = () => {

    const [authors] = useState(authorsArray);

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






    return (
        <React.Fragment>
            <Row className="authors">
                <Col className="px-0">
                    <h1 className="border-bottom-5-dark pb-1">Authors</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AuthorList authors={authors} handleOnDeleteAuthor={handleOnDeleteAuthor}/>
                </Col>
            </Row>
            <Row className="px-0">
                <Col className="authors px-0">
                    <Plus className="plus_icon align-top me-1" />
                    <label >Add Author</label>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Authors;