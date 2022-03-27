import {Col, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import React, {PropsWithChildren} from "react";

type BookFormHeaderProps = {
    updateBookIndex: number | null;
    onCloseClick: () => void;
}

const BookFormHeader: React.FC<BookFormHeaderProps> = (props:PropsWithChildren<BookFormHeaderProps>) => {
  return (
      <Row className="book_form">
          <Col xs={11} className="px-0">
              <h2 className="px-0 fs-3">{props.updateBookIndex === null ? "Create" : "Update"} Book</h2>
          </Col>
          <Col xs={1} className="p-0 d-flex justify-content-end align-items-center">
              <XCircle className="x_circle me-2" onClick={props.onCloseClick}/>
          </Col>
      </Row>
  )
}

export default BookFormHeader;