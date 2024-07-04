import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styles from './Faqcards.module.css';
import Preview from './Preview';
import cardImage from '../../../Assets/cardImg.png';

const FaqCards = ({ isSourceActive, onCheckbox, data, onSelectFAQ }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Array(data.message.message.source_path.length).fill(false));
    const [selectedSourcepath, setSelectedSourcePath] = useState(null);
    
    const handlePreview = () => {
        const selectedIndex = selectedItems.findIndex((item) => item);
        if(selectedIndex !== -1) {
            const selectedSourcepath = data?.message?.message?.source_path[selectedIndex]
            setSelectedSourcePath(selectedSourcepath);
            setShowModal(true);
            console.log(selectedSourcepath)
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };
    
    const handleCardCheck = (index) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setSelectedItems(updatedSelectedItems);
        
        const isChecked = updatedSelectedItems.includes(true) || !updatedSelectedItems.includes(false);
        onCheckbox(isChecked);
        
        const selectedSourcepath = data.message.message.source_path
        .filter((_, i) => updatedSelectedItems[i])
        onSelectFAQ(selectedSourcepath);
    };
    
    const hasErrorMessage = data && data.message && data.message.status === "failed";

    const [lastSuccessdata, setLastSuccessdata] = useState(null);

    useEffect(() => {
        setSelectedItems(new Array(data.message.message.source_path.length).fill(false));
        setSelectedSourcePath(null);
        onSelectFAQ("");
    }, [data, hasErrorMessage])


    return (
        <div className='mt-2'>
            <Row >
                {data?.message?.message?.source_path.map((path, index) => (
                    <Col lg={6} key={index} >
                        <Card 
                            className={`${styles.faqcard} ${selectedItems[index] ? styles.selectedCard : ''} mb-4`}
                            onClick={() => handleCardCheck(index)}>
                            <div className={styles.imageContainer}>
                                <input
                                    type='checkbox'
                                    className={`${styles.checkbox} ${isSourceActive[index] ? styles.hideCheckbox  : ''}`}
                                    checked={selectedItems[index]}
                                />
                                <Card.Img variant="top" src={cardImage} alt='card image' className={styles.cardImage} />
                                {selectedItems[index] && <div className={styles.overlay} />}
                            </div>
                            <Card.Body className={styles.faqCardBody}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <Card.Title className={styles.title}>FAQ</Card.Title>
                                    <Card.Link className={styles.link} onClick={handlePreview}>
                                        View
                                    </Card.Link>
                                </div>
                                <Card.Subtitle className={styles.subtitle}>{path}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Preview show={showModal} handleClose={handleClose} onSelectPath={selectedSourcepath}/>
        </div>
    );
};

export default FaqCards;