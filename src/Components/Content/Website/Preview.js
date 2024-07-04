import React, { useState, useEffect } from 'react';
import styles from './Preview.module.css';
import { Modal } from 'react-bootstrap';
import close from '../../../Assets/PreviewClose.svg';
import ClipLoader from "react-spinners/ClipLoader";
import { BASE_URL_2 } from '../../../api';

const Preview = ({ show, handleClose, onSelectPath }) => {
    const [documentUrl, setDocumentUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const source = `internal_content/${onSelectPath}`;

    console.log(source)
    
    useEffect(() => {
        
        const fetchDocument = async () => {
            setLoading(true);
            try {
                const sourcePath = `internal_content/${onSelectPath}`;
                const response = await fetch(`${BASE_URL_2}/faq`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sourcePath }),
                });
                console.log('response', response);
                if (!response.ok) {
                    throw new Error('failed to fetch document')
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setDocumentUrl(url);
                console.log('doc url', url)
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchDocument();
        }, 1000);
    }, [onSelectPath]);
    // console.log(onSelectPath)

    return (
        <Modal className={styles.modal} show={show} size='xl' centered>
            <Modal.Header className='border-0 justify-content-end'>
                <button className={styles.close} onClick={handleClose}>Close <img src={close} alt='close'/></button>
            </Modal.Header>
            <Modal.Body >
                <div className={styles.modalBody}>
                    {loading ? (
                        <div style={{height: '800px'}}>
                        <p className={styles.loading}>loading...</p>
                        </div>
                    ) : (
                        <iframe src={documentUrl} style={{ width: "1060px", height: "600px" }} typeof='application/pdf'></iframe>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Preview;