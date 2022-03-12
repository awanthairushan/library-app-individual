import React from 'react';
import {Container,Col,Row} from 'react-bootstrap'
import Welcome from '../components/welcome/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authors from '../components/authors/Authors'
// import Books from '../components/books/Books'

const LibraryPage: React.FC = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Welcome/>
                </Col>
            </Row>
            <Row>
                <Col xs={{span:12,order:2}} md={{span:6,order:1}} className="px-sm-5 px-4 mb-4">
                    {/* <Books/> */}
                </Col>
                <Col xs={{span:12,order:1}} md={{span:6,order:2}} className="px-sm-5 px-4 mb-4">
                    <Authors/>
                </Col>
            </Row>
        </Container>
    );
}
export default LibraryPage;