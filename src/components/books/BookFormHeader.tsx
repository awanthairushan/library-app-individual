import {Col, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import React, {PropsWithChildren} from "react";
import {useAppSelector} from "../../store/hooks";

type BookFormHeaderProps = {
    onCloseClick: () => void;
}

const BookFormHeader: React.FC<BookFormHeaderProps> = (props: PropsWithChildren<BookFormHeaderProps>) => {

    const updateBookIndex = useAppSelector((state) => state.library.updateBookIndex)


    return (
        <Row className="book_form">
            <Col xs={11} className="px-0">
                <h2 className="px-0 fs-3">{updateBookIndex === -1 ? "Create" : "Update"} Book</h2>
            </Col>
            <Col xs={1} className="p-0 d-flex justify-content-end align-items-center">
                <XCircle className="x_circle me-2" onClick={props.onCloseClick}/>
            </Col>
        </Row>
    )
}

export default BookFormHeader;