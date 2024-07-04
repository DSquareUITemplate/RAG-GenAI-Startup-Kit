import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './WebHeader.module.css';
import home from '../../../../src/Assets/Group 41736.svg';
import push from '../../../../src/Assets/Group 41720 (1).svg';
import download from '../../../../src/Assets/Group 41720 (2).svg';
import share from '../../../../src/Assets/Group 41720 (3).svg';
import pdf from '../../../../src/Assets/Group 41458 (2).svg';
import ppt from '../../../../src/Assets/Group 41458 (3).svg';
import doc from '../../../../src/Assets/Group 41458 (4).svg';
import Share from './share';

const WebHeader = ({ onExportToPDF, onExportToPPT, onExportToDoc }) => {
    const [showModal, setShowModal] = useState(false);
    const [isSelected, setIsSelected] = useState(false);


    const handleShare = () => {
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
    }
    const handleCrossClose = () => {
        setShowModal(false);
    }

    const [downloadDropdown, setDownloadDropdown] = useState(false);
    const dropdownRef = useRef(null);


    const handleDownloadDropdown = () => {
        setDownloadDropdown(!downloadDropdown);
    }

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDownloadDropdown(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])




    return (
        <div className={`${styles.WebHeader} container-fluid`} >
            <Row className='d-flex justify-content-between'>
                <Col lg={2} className={styles.homeWebsite}>
                    <div className='breadcrumb mb-0' >
                        <a href="/" className={`${styles.home} breadcrumb-item mb-0`}><img src={home} alt='home' />Home</a>
                        <p href="#" className={`${styles.website} breadcrumb-item mb-0`} active='true'>
                            FAQ
                        </p>
                    </div>
                </Col>
                <Col lg={10} className={`${styles.rightBtn}`}>
                    <button className={styles.share} onClick={handleShare}>Share<img src={share} alt='share' /></button>
                    <div ref={dropdownRef}>
                        <button className={styles.download} onClick={handleDownloadDropdown}>Download<img src={download} alt='download' /></button>
                        {downloadDropdown && (
                            <div className={styles.dropdownContent}>
                                <span className={styles.citation}><span>Citations</span> <input type='checkbox' className={styles.checkbox} /></span>
                                <span className={styles.claim}><span>Claim Repository</span> <input type='checkbox' className={styles.checkbox} /></span>
                                <hr style={{ width: '80%', marginBottom: '0' }} />
                                <button className={styles.pdf} onClick={onExportToPDF}>
                                    <img src={pdf} alt='pdf' />Export to PDF <img src={download} alt='download' className={styles.downloadIcon} />
                                </button>
                                <button className={styles.ppt} onClick={onExportToPPT}>
                                    <img src={ppt} alt='ppt' />Export to PPT <img src={download} alt='download' className={styles.downloadIcon} />
                                </button>
                                <button className={styles.doc} onClick={onExportToDoc}>
                                    <img src={doc} alt='document' />Export to Doc <img src={download} alt='download' className={styles.downloadIcon} />
                                </button>
                            </div>
                        )}
                    </div>
                    <button className={styles.push}>Push MLR<img src={push} alt='push MLR' /></button>
                </Col>
            </Row>
            <Share show={showModal} handleClose={handleClose} handleCrossClose={handleCrossClose} />
        </div>
    )
}

export default WebHeader;