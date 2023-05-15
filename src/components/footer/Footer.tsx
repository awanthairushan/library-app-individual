import React from 'react';
import {Row, Col} from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <Row className='text-center text-white' style={{ backgroundColor: '#21081a' }}>
            <div className='container p-4'></div>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className='text-white' href='https://www.softvessel.com/training/upcoming/react-base-industrial-training-may-2021'>
                    softvessel
                </a>
            </div>
        </Row>
    );
}

export default Footer;