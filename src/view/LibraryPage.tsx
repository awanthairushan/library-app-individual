import React from 'react';
import {Container,Col,Row} from 'react-bootstrap'
import Welcome from '../components/welcome/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';

const LibraryPage: React.FC = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Welcome/>
                </Col>
            </Row>
        </Container>
    );
}
export default LibraryPage;