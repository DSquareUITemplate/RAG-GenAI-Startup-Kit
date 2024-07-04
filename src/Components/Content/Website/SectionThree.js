import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './SectionThree.module.css';
import dot from '../../../../src/Assets/dot.svg';
import trashIcon from '../../../../src/Assets/Trash.svg';
import editIcon from '../../../../src/Assets/Pen.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SectionThree = ({ data, plagarismResult }) => {
    const [editingMode, setEditingMode] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const [editedPrompt, setEditedPrompt] = useState('');
    const [rephrasedSentence, setRephrasedSentence] = useState([])
    const [selectedSentence, setSelectedSentence] = useState(null);
    const [rephraseContainer, setRephraseContainer] = useState(false);
    const [paraphaseClick, setParaphaseClick] = useState(false);
    const selectedSentenceData = useRef({
        index: null,
        rephrasedSentence: '',
    });
    const quillRef = useRef(null);

    const sourceArray = [].concat(...plagarismResult.map(line =>
        line.source)
    )

    function generateNumbers(sourceArray) {
        let numberMap = {};
        let resultArray = [];
       
        for (let i = 0; i < sourceArray.length; i++) {
          const currentElement = sourceArray[i];
       
          if (currentElement !== '' && !numberMap.hasOwnProperty(currentElement)) {
            // If the element is not an empty string and not found in the map
            numberMap[currentElement] = Object.keys(numberMap).length + 1;
          }
       
          resultArray.push(currentElement !== '' ? numberMap[currentElement] : '');
        }
       
        return resultArray;
      }
       
    //   const inputArray = ['xeralto', 'humira', 'xeralto', 'xeralto', 'humira', '', '', 'vamsi', 'humira', 'krishna', 'xeralto', 'krishna', 'vamsi', 'humira', ''];
      const newArray = generateNumbers(sourceArray);
       
    //   console.log(newArray);


    const hasErrorMessage = data && data.message && (data.message.status === "failed" || data.message.status === "EXCEPTION") ;


    const plagarismArray = plagarismResult.map(line =>
        line.Plagiarised
    )

    const plagiarizedSentence = [].concat(...plagarismArray);
    // console.log("PLAGIARISED SENTENCE",plagiarizedSentence);

    useEffect(() => {
        const updatedRephrasedSentences = plagarismResult.map((line, index) =>
            line.Rephrased.map((sentence) => `A:${index + 1} - ${sentence}`)
        );

        setRephrasedSentence([].concat(...updatedRephrasedSentences));
    }, [plagarismResult]);


    useEffect(() => {
        setEditedPrompt(data.message?.message?.result || '');
    }, [data]);

    useEffect(() => {
        if (editingMode) {
            setEditedPrompt(data.message?.message?.result || '');
            // quillRef.current.focus();
        }
    }, [editingMode, data]);
    

    const toggleIcon = () => {
        setShowIcons(!showIcons);
    };

    const handleEditClick = () => {
        setEditingMode(!editingMode);
        if(!editingMode) {
            const resultLine = data.message?.message?.result.split('\n') || [];
            setEditedPrompt(resultLine.join('<br/>'))
        }
    };

    const handleChange = (value) => {
        setEditedPrompt(value);
        data.message.message.result = value;
    };


    const handleonClickSentence = (index) => {
        setSelectedSentence(index);
        setParaphaseClick(true);
        // setRephraseContainer(!rephraseContainer)
    }

    const isPlagiarized = (sentence) => {
        const sanitizedSentence = sentence.replace(/^A:\d+ - /, '').trim();
        return plagiarizedSentence && plagiarizedSentence.some(plagarized => plagarized.includes(sanitizedSentence))
    };


    const [plagiarizedIndex, setplagiarizedIndex] = useState(null);
    const [editRephrase, setEditRephrase] = useState(false);


    const handleParaphaseClick = (index) => {
        console.log(index)
        const sentence = data.message?.message?.result.split('\n')[index]
        const plagiarizedIndex = plagiarizedSentence.findIndex((plagiarized) => plagiarized.includes(sentence.replace(/^A:\d+ - /, '').trim()));
        console.log(plagiarizedIndex)

        if (plagiarizedIndex !== -1) {
            setSelectedSentence(plagiarizedIndex);
            setParaphaseClick(true);
            setRephraseContainer(!rephraseContainer)
            const correspondingRephrased = rephrasedSentence[plagiarizedIndex] || '';
            // console.log(correspondingRephrased)
            selectedSentenceData.current = {
                index: plagiarizedIndex,
                rephrasedSentence: correspondingRephrased, // Set the rephrased sentence for the selected index
            };
            console.log(selectedSentenceData)
            setEditRephrase(correspondingRephrased)
            setplagiarizedIndex(plagiarizedIndex)
        }
    };

    useEffect(() => {

        // console.log(selectedSentenceData)
    }, [selectedSentenceData])

    const submitRephrasedSentence = () => {
        const newResult = [...data.message?.message?.result.split('\n')];

        if (editRephrase) {
            // If the user has edited the rephrased sentence
            newResult[selectedSentence] = editRephrase;
        } else {
            // If the user is directly submitting a rephrased sentence
            newResult[selectedSentence] = selectedSentenceData.current.rephrasedSentence;
        }
        console.log(newResult)

        data.message.message.result = newResult.join('\n');

        // Reset the states
        setParaphaseClick(false);
        setRephraseContainer(false);
        setEditRephrase(false);
        setSelectedSentence(null);
    };

    const handleEditRephrase = () => {
        // setEditRephrase(!editRephrase);
    }


    const modules = {
        toolbar: [
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            // ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
        ],
    }

    const getBackGroundColor = (index) => {
        if(index === 0) {
            return '#D3392E';
        } else if(index === 1) {
            return '#569D01'
        } else if(index === 2) {
            return '#B54BB9'
        }
    }

    const getPlagiarismBackGroundColor = (index) => {
        if(index === 0) {
            return '#eebdba';
        } else if(index === 1) {
            return '#afcb8d'
        } else if(index === 2) {
            return '#d99fdb'
        }
    }


    return (
        <div className={styles.bgSectionThree}>
            <Container className={`${styles.SectionThree}`}>
                <Row>
                    <Col lg={12}>
                        <Card className={styles.sectionCard}>
                            <Card.Body>
                                <div className={styles.iconContainer}>
                                    {showIcons && (
                                        <div className={styles.hiddenIcons}>
                                            <img src={trashIcon} alt="trash" className={styles.trash} />
                                            <img src={editIcon} alt="edit" className={styles.edit} onClick={handleEditClick} />
                                        </div>
                                    )}
                                    <img src={dot} alt="dot" className={styles.dot} onClick={toggleIcon} />
                                </div>
                                <Card.Title className={styles.title}>FAQ</Card.Title>
                                <div className={styles.faqContent}>
                                    {hasErrorMessage ? (
                                        <p className={styles.text}>
                                            {data.message.message}
                                        </p>
                                    ) : (
                                        <>
                                            {data?.message?.message && !editingMode ? (
                                                <Card.Text className={styles.text} id='faqContent'>
                                                    {(editingMode ? editedPrompt : data?.message?.message?.result || ' ').split('\n').filter(line => line.trim() !== '').map((line, index) => {
                                                        const sanitizedLine = line.trim();
                                                        const plagarismIndex = plagiarizedSentence.findIndex(plagarized => plagarized.includes(sanitizedLine.replace(/^A:\d+ - /, '').trim()));
                                                        const bgColor = isPlagiarized(sanitizedLine) ? getBackGroundColor(newArray[plagarismIndex] - 1) : 'transparent';
                                                        const plagiarismBgColor = isPlagiarized(sanitizedLine) ? getPlagiarismBackGroundColor(newArray[plagarismIndex] - 1) : 'transparent';
                                                        return(
                                                        <div key={index} onClick={() => handleonClickSentence(index)} >
                                                            <span dangerouslySetInnerHTML={{ __html: line }} 
                                                                style={{
                                                                    fontSize: /^Q:\d+ - /.test(line) ? '13px' : 'inherit',
                                                                    color: /^Q:\d+ - /.test(line) ? '#000048' : '#000',
                                                                    backgroundColor: plagiarismBgColor
                                                                    // paddingTop: /^Q:\d+ - /.test(line) ? '5px' : '5px',
                                                                }}
                                                            ></span>
                                                            {isPlagiarized(sanitizedLine) && (
                                                                <span style={{ backgroundColor: bgColor }} className={styles.index}>
                                                                    {newArray[plagarismIndex]}
                                                                </span>
                                                            )}
                                                            {paraphaseClick && isPlagiarized(sanitizedLine) && selectedSentence === index && (
                                                                <>
                                                                    <button className={styles.paraphrase} onClick={() => handleParaphaseClick(index)}>
                                                                        Paraphrase
                                                                    </button>
                                                                    {/* <span>{newArray[plagiarizedIndex]}</span> */}
                                                                </>
                                                            )}


                                                            {rephraseContainer && selectedSentence === index && isPlagiarized(sanitizedLine) && (
                                                                <div className={styles.rephraseDropdown}>
                                                                    <div className={styles.rephraseHeader}>
                                                                        <p onClick={handleEditRephrase}>Edit</p>
                                                                        <p>Rephrase</p>
                                                                    </div>
                                                                    <textarea style={{ width: '100%', border: 'none', resize: 'none', overflow: 'visible', outline: 'none', height: '50px' }}
                                                                        value={editRephrase}
                                                                        onChange={e => {
                                                                            setEditRephrase(e.target.value)
                                                                        }}
                                                                    />
                                                                    <p className={styles.submit} onClick={submitRephrasedSentence}>
                                                                        Submit
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <div>
                                                            </div>
                                                        </div>
                                                        )}
                                                    )}
                                                </Card.Text>
                                            ) : (
                                                <>
                                                    {editingMode &&
                                                        <ReactQuill theme="snow" value={editedPrompt} onChange={handleChange} modules={modules} dangerouslySetInnerHTML={{ __html: editedPrompt }}/>
                                                    }
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SectionThree;


