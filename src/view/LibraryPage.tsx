import React, {useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import Welcome from '../components/welcome/Welcome';
import Authors from '../components/authors/Authors'
import Books from '../components/books/Books';
import Footer from "../components/footer/Footer";
import {IAuthor} from "../types/dataTypes";

const LibraryPage: React.FC = () => {

    const authorsArray: IAuthor[] = [];

    const [authors, setAuthors] = useState<IAuthor[]>(authorsArray);

    return (
        <Container fluid className="">
            <Row>
                <Col>
                    <Welcome/>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 12, order: 2}} md={{span: 6, order: 1}} className="px-sm-5 px-4 mb-4">
                    <Books authors={authors}/>
                </Col>
                <Col xs={{span: 12, order: 1}} md={{span: 6, order: 2}} className="px-sm-5 px-4 mb-4">
                    <Authors
                        authors={authors}
                        setAuthors={setAuthors}
                    />
                </Col>
            </Row>
            <Row className="mx-0 px-0 d-flex align-items-end">
                <Col className="mx-0 px-0 footer">
                    <Footer/>
                </Col>
            </Row>
        </Container>
    );
}
export default LibraryPage;