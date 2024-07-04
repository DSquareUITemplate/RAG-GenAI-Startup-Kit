import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './SectionTwo.module.css';
import arrow from '../../../Assets/Group 41721.svg';
import FaqCards from './FaqCards';

const SectionTwo = ({ onFaqDone, data, onSelectFaq }) => {

    const [isSourceActive, setIsSourceActive] = useState(false);
    const [selectedSource, setSelectedSource] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [lastSuccessdata, setLastSuccessdata] = useState(null);
    const sourceOptions = ["DAMS/Internal Data", "External Open Source Data"];
    const dropdownRef = useRef(null);

    const handleSource = (e) => {
        setIsSourceActive(!isSourceActive);
    }

    const handleDone = () => {
        if (isChecked) {
            onFaqDone();
        } else {
            alert('please select atleast one card')
        }
    }

    const handleCheck = (isChecked) => {
        setIsChecked(isChecked);
    }

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsSourceActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    // console.log(data)
    const hasErrorMessage = data && data.message && (data.message.status === "failed" || data.message.status === "EXCEPTION") ;

    useEffect(() => {
        setIsChecked(!isChecked);
    }, [data])

    useEffect(() => {
        onSelectFaq('');
        setIsChecked(false)
    }, [data, hasErrorMessage])

    return (
        <Container className={styles.SectionTwo}>
            <Row>
                <Col lg={12}>
                    <div ref={dropdownRef}>
                        <div className={`${styles.types} ${isSourceActive ? styles.active : ''}`} onClick={handleSource}>{selectedSource || "Data Source"}<img src={arrow} alt='dropdown icon'/></div>
                        {isSourceActive && (
                            <ul className={styles.dropdownContent}>
                                {sourceOptions.map((sourceOption) => (
                                    <li key={sourceOption} className={styles.dropdownList} value={sourceOption} onClick={(e) => {
                                        setSelectedSource(sourceOption);
                                        setIsSourceActive(false)
                                    }}>{sourceOption}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Col>
            </Row>
            <div className={styles.cardsContainer}>
                {selectedSource === "DAMS/Internal Data" && data ? (
                    <div>
                        {data && data.message && data.message.message && !hasErrorMessage ? (
                            <>
                                <FaqCards isSourceActive={isSourceActive} 
                                    onCheckbox={handleCheck} 
                                    data={data} 
                                    className="pe-0" 
                                    onSelectFAQ={onSelectFaq}/>
                                <Row >
                                    <Col lg={12}>
                                        <button className={`${!isChecked ? styles.doneDisabled : styles.done}`} 
                                            onClick={handleDone}
                                            disabled={!isChecked}>
                                            Done
                                        </button>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <div>
                                {!hasErrorMessage ?  
                                    <p className={styles.error}>No data available</p> : 
                                   ''
                                }   
                            </div>
                        )}
                    </div>
                ) : null}
                {selectedSource === "External Open Source Data" && (
                    <div>

                        {/* <Row>
                            <Col lg={6} className='pe-1'>
                                <FaqCards isSourceActive={isSourceActive} onCheckbox={handleCheck} />
                            </Col>
                            <Col lg={6} className='ps-1'>
                                <FaqCards isSourceActive={isSourceActive} onCheckbox={handleCheck} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className='pe-1'>
                                <FaqCards isSourceActive={isSourceActive} onCheckbox={handleCheck} />
                            </Col>
                            <Col lg={6} className='ps-1'>
                                <FaqCards isSourceActive={isSourceActive} onCheckbox={handleCheck} />
                            </Col>
                        </Row>
                        <Row >
                            <Col lg={12}>
                                <button className={`${!isChecked ? styles.doneDisabled : styles.done}`} onClick={handleDone} disabled={!isChecked}>Done</button>
                            </Col>
                        </Row> */}
                    </div>

                )}
            </div>
        </Container>
    )
}
export default SectionTwo;