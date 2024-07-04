import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import dot from '../../../../src/Assets/dot.svg';
import trashIcon from '../../../../src/Assets/Trash.svg';
import edit from '../../../../src/Assets/Pen.svg';
import back from '../../../Assets/Group 41478.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './CombinedFaq.module.css';

const CombinedFaq = ({ onBack }) => {
    const [showIcons, setShowIcons] = useState(false);
    const [data, setData] = useState([
        {
            question: "1. What Is The Link Between Cholesterol And Heart Disease?",
            answer: "Cardiology is a branch of medicine that deals with disorders of the heart and the cardiovascular system. All cardiologists in the branch of medicine study the disorders of the heart, but the study of adult and child heart disorders each require different training pathways. Therefore, an adult cardiologist (often simply called “cardiologist”) is inadequately trained to take care of children, and pediatric cardiologists are not trained to treat adult heart disease."
        },
        {
            question: "2. What Are The Symptoms Of A Heart Attack?",
            answer: "A heart attack occurs when the blood flow to a part of your heart muscle is severely reduced or stopped. This can damage or kill the heart muscle and affect its ability to pump blood. Some of the common signs and symptoms of a heart attack include chest pain or discomfort, shortness of breath, nausea, vomiting, sweating, lightheadedness, or pain in the arms, neck, jaw, or back"
        },
        {
            question: "3. How Can I Prevent Heart Disease?",
            answer: "Heart disease is largely preventable by adopting a healthy lifestyle. Some of the key steps you can take to lower your risk of heart disease include quitting smoking, controlling your blood pressure, cholesterol, and blood sugar levels, maintaining a healthy weight, eating a balanced diet that is low in saturated and trans fats, salt, and added sugars, and high in fruits, vegetables, whole grains, and fiber, exercising regularly, managing your stress, and limiting your alcohol intake."
        },
        {
            question: "4. What Are The Different Types Of Cardiologists And What Do They Do?",
            answer: "Cardiologists are doctors who specialize in diagnosing and treating diseases and conditions of the heart and blood vessels. There are different types of cardiologists who have additional training and expertise in specific areas of cardiology."
        },
        {
            question: "5. What Are Some Common Heart Diseases In Children?",
            answer: "Congenital heart disease (CHD): This is a type of heart disease that a child is born with. It occurs due to heart defects that are present at birth, such as holes in the heart, abnormal valves, or underdeveloped chambers. Atherosclerosis: This is a condition where fat and cholesterol build up inside the arteries, causing them to narrow and harden. This can reduce the blood flow to the heart and other organs, and increase the risk of blood clots, heart attacks, and strokes."
        }]
    );

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(null);
    const editorRef = useRef(null);
    const editorQuesRef = useRef(null);

    const handleDoubleClick = (index, type) => {
        // setShowToolbar(true);
        setSelectedItemIndex(index);
        setSelectedItemType(type);
        setActiveItemIndex(index);


    };

    const [isEditing, setIsEditing] = useState(false);

    const handleEditText = () => {
        setIsEditing(true);


        if(isEditing) {
            handleEdit(selectedItemType);
            if(editorRef.current) {
                editorRef.current.focus();
                editorRef.current.click();
            }
            
        }
    }

    useEffect(() => {
        // const editor = editorRef.current?.getEditor();
        if(isEditing) {
            const editor = selectedItemType === 'question' ? editorQuesRef.current : editorRef.current;
            if (editor && editor.getEditor) {
                const quill = editor.getEditor();
                quill?.focus();
                quill?.setSelection(0, 0);
            }
        }
    }, [isEditing, selectedItemType])

    const handleEdit = (type) => {
        setShowToolbar(!showToolbar);
    }


    useEffect(() => {
        const editor = editorRef.current?.getEditor();
        const questionEditor = editorQuesRef.current?.getEditor();

        const changeHandler = (delta, oldDelta, source) => {
            const hasFormatting = delta.ops.some(op => op.attributes);
            if (hasFormatting && source === 'user') {
                setShowToolbar(true);
            }
        };

        editor?.on('text-change', changeHandler);
        questionEditor?.on('text-change', changeHandler);
        return () => {
            editor?.off('text-change', changeHandler);
            questionEditor?.off('text-change', changeHandler);
        };
    }, [editorRef.current, editorQuesRef.current]);


    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1' }, { 'indent': '+1' }],                 
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
            ],
        }
    };

    const formats = ['color', 'bold', 'italic', 'underline', 'font', 'size'];

    const handleChange = (value, type) => {
        const newData = [...data];
        newData[selectedItemIndex][type] = value;
        setData(newData);
    };

    const handleBack = () => {
        onBack();
    }
    const toggleIcon = () => {
        setShowIcons(!showIcons);
    }

    const handleEnterKey = (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newData = [...data];
            newData.splice(index + 1, 0, { question: '', answer: '' });
            setData(newData);
            setSelectedItemIndex(index + 1);
            setSelectedItemType('question');
        }
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            // const contentElement = document.getElementById('faqContent');         
            // const editingElements = contentElement.querySelectorAll('.editing-element');
            // editingElements.forEach(element => {
            //     element.style.display = 'none';
            // }); 
        }
     }
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return() => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])



    return (
        <Container className={styles.faqContainer}>
            <Row>
                <Col lg={12}>
                    <Card className={styles.sectionCard}>
                        <Card.Body className={styles.cardBody}>
                            <div className={styles.faqHeader}>
                                <p className={styles.back} onClick={handleBack}><img src={back} alt="Back" />Back</p>
                                <div className={styles.iconContainer}>
                                    {showIcons && (
                                        <div className={styles.hiddenIcons}>
                                            <img src={trashIcon} alt='trash' className={styles.trash} />
                                            <img src={edit} alt='edit' className={styles.edit} onClick={handleEditText} />
                                        </div>
                                    )}
                                    <img src={dot} alt='three dot' className={styles.dot} onClick={toggleIcon} />
                                </div>
                            </div>
                            <div className={styles.faqContent}>
                                <div 
                                //  id='faqContent'
                                 >
                                <h1 className={styles.title}>FAQ</h1>
                                    {data.map((faqData, index) => (
                                        <div id='faqItem'>
                                            <div key={index} className={styles.faqItem} ref={dropdownRef}>
                                                    <div className={styles.question}>
                                                        <div style={{width:'2%'}}>
                                                            {(isEditing && selectedItemType === 'question' && activeItemIndex === index) && (
                                                                <img src={dot} alt='three dot' className={`${styles.dotIcon} editing-element`} onClick={() => handleEdit('question')} />
                                                            )}
                                                        </div>
                                                        <div style={{width: '98%'}}>
                                                            {selectedItemIndex === index && selectedItemType === 'question' && showToolbar ? (
                                                                    <ReactQuill  
                                                                        theme="snow"
                                                                        value={faqData.question}
                                                                        onChange={(value) => handleChange(value, 'question')}
                                                                        modules={modules}
                                                                        formats={formats}
                                                                        ref={editorQuesRef}
                                                                        className='editing-element'
                                                                    // onKeyDown={(event) => handleEnterKey(event, index)}
                                                                        onClick={() => handleDoubleClick(index, 'question')}
                                                                    />
                                                                ) : (
                                                                <div>
                                                                    <div className={styles.subtitle}
                                                                        onClick={() => handleDoubleClick(index, 'question')} id='question'>
                                                                        <div dangerouslySetInnerHTML={{ __html: faqData.question }} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={styles.answer}>
                                                        <div style={{width:'2%'}}>
                                                            {(isEditing && selectedItemType === 'answer' && activeItemIndex === index) && (
                                                                <img src={dot} alt='three dot' className={`${styles.dotIcon} editing-element`} onClick={() => handleEdit('answer')} />
                                                            )}
                                                        </div>
                                                        <div style={{width:'98%'}}>
                                                            {selectedItemIndex === index && selectedItemType === 'answer' && showToolbar ? (
                                                                <ReactQuill   
                                                                    theme="snow"
                                                                    value={faqData.answer}
                                                                    onChange={(value) => handleChange(value, 'answer')}
                                                                    modules={modules}
                                                                    formats={formats}
                                                                    ref={editorRef}
                                                                    className='editing-element'
                                                                // onKeyDown={(event) => handleEnterKey(event, index)}
                                                                    onClick={() => handleDoubleClick(index, 'answer')}
                                                                />
                                                            ) : (
                                                                <div className={styles.text}
                                                                    onClick={() => handleDoubleClick(index, 'answer')} id='answer'>
                                                                    <div dangerouslySetInnerHTML={{ __html: faqData.answer }} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CombinedFaq;



