import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillEye } from 'react-icons/ai';
import './_videoHorizontal.scss';
import { Col, Row } from 'react-bootstrap';

const VideoHorizontal = () => {
    const seconds = moment.duration(100).asSeconds();
    const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');
    return (
        <Row className='videoHorizontal m-1 py-2 align-items-center'>
            <Col xs={6} md={4} className='videoHorizontal__left'>
                <LazyLoadImage src='/images/avatar-logo.png' effect='blur' className='videoHorizontal__thumbnail' wrapperClassName='videoHorizontal__thumbnail-wrapper' />
                <span className='videoHorizontal__duration'>{formattedDuration}</span>
            </Col>
            <Col xs={6} md={8} className='videoHorizontal__right'>
                <p className='videoHorizontal__title mb-1'>
                    Be a full stack developer in 1 month
                </p>
                <div className='videoHorizontal__details'>
                    <AiFillEye /> {numeral(1000000).format('0.a')} Views •
                    {moment(2).fromNow()}
                </div>
                <div className='videoHorizontal__channel d-flex align-items-center my-1'>
                    {/* <LazyLoadImage src='/images/avatar-logo.png' effect='blur' /> */}
                    <p>Backbench Coder</p>
                </div>
            </Col>
        </Row>
    );
};

export default VideoHorizontal;