import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './WebHeader.module.css';
import home from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41736.svg';
import push from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41720 (1).svg';
import download from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41720 (2).svg';
import share from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41720 (3).svg';
import pdf from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41458 (2).svg';
import ppt from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41458 (3).svg';
import doc from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41458 (4).svg';
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
            {/*<Row className='d-flex justify-content-between'>
               
                <Col lg={10} className={`${styles.rightBtn}`}>
                
                    <div ref={dropdownRef}>
                        <button className={styles.download} onClick={handleDownloadDropdown}>Download<img src={download} alt='download' /></button>
                        {downloadDropdown && (
                            <div className={styles.dropdownContent}>
                               
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
                
                </Col>
            </Row>
                        <Share show={showModal} handleClose={handleClose} handleCrossClose={handleCrossClose} />*/}
        </div>
    )
}

export default WebHeader;