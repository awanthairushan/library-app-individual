import React,{useState} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap';
import {XCircle} from 'react-feather';
import {IAuthor} from '../../types/dataTypes';

type AuthorFormProps = {
    onCloseClick : () => void
    onCreateClick: (author: IAuthor) => void
}

const AuthorForm : React.FC<AuthorFormProps> = (props) => {

    const [authorName,setAuthorName] = useState<string>("");
    const [validated,setValidated] = useState(false);

    const handleOnChange = (name:string) => {
        setAuthorName(name);
    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            const temporyAuthor:IAuthor = {name:authorName}
            props.onCreateClick(temporyAuthor);
            setAuthorName("");
            
        }
        setValidated(false);
        
    }

    return (
        <Row>
            <Col lg={9} md={12} className="pe-4">
                <Row className="author_form">
                    <Col xs={11} className="px-0">
                        <h2 className="px-0 fs-3">Create Author</h2>
                    </Col>
                    <Col xs={1} className="p-0 d-flex justify-content-end align-items-center">
                        <XCircle className="x_circle" onClick={props.onCloseClick}/>
                    </Col>
                </Row>
                <Row className="author_form pt-4 ">
                    <Col className="pe-0 ms-lg-4 me-md-2">
                        <Form noValidate validated={validated} className="" id="author_form"  onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label className="px-0">Name of Author</Form.Label>
                                <Form.Control type="text" className="form_control px-0" size="sm" value={authorName} required onChange={(event) => handleOnChange(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Author Name is required.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="author_form py-4 ">
                    <Col className="pe-0 d-flex justify-content-end me-md-2">
                    <Button variant="primary" className="px-4 py-1 fs-6 create_button" size="sm" type="submit" form="author_form">Create</Button>
                    </Col>
                </Row>
            </Col>
            <Col lg={3} md={0}>

            </Col>
        </Row>
    );
}

export default AuthorForm;