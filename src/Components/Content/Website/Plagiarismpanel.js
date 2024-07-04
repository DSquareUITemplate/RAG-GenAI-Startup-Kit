import React, { useState, useEffect } from 'react';
import styles from './Plagiarismpanel.module.css';
import close from '../../../Assets/PreviewClose.svg';
import ReactSpeedometer from 'react-d3-speedometer';
import dropdown from '../../../Assets/dropdown.svg';
import Preview from './Preview';

const PlagiarismPanel = ({ onPanelClose, plagarismResult, plagarismWordcount }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        onPanelClose();
    }

    const sourceArray = [].concat(...plagarismResult.map(line =>
        line.source)
    )
    const scoreArray = [].concat(...plagarismResult.map(line =>
        line.score)
    )

    const originalContent = [].concat(...plagarismResult.map(line =>
        line.original_content)
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

      const newArray = generateNumbers(sourceArray);  
      console.log("new array*********",newArray);
    

    const source = sourceArray.filter((s) => typeof s === 'string' && s.trim() !== '')
    
    const score = scoreArray.filter((s) => typeof s === 'number')
    // console.log(source, score);

    const sourceCountMap = source.reduce((acc, curr, index) => {
        if (!acc[curr]) {
            acc[curr] = {
                count: 1,
                totalScore: score[index],
            };
        } else {
            acc[curr].count++;
            acc[curr].totalScore += score[index];
        }
        return acc;
    }, {});
    
    const uniqueSourcesWithAverages = Object.keys(sourceCountMap).map((source) => {
        const { count, totalScore } = sourceCountMap[source];
        const averageScore = totalScore / count;
        return { source, averageScore };
    });
    
    const overallScore = (((plagarismWordcount.matching_word_count) / (plagarismWordcount.total_word_count)) * 100).toFixed(0);
    
    const getBackGroundColor = (index) => {
        if (index === 0) {
            return '#D3392E';
        } else if (index === 1) {
            return '#569D01'
        } else if (index === 2) {
            return '#B54BB9'
        }
    }
    
    const [openDropdown, setOpenDropdown] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    
    const handlePlagiarismContent = (index) => {
        // setToggleDropdown(!toggleDropdown);
        setSelectedIndex(index)
        setOpenDropdown((prev =>
            prev.includes(index)
                ? prev.filter(item => item !== index) : [...prev, index]))
    }
        

    const contentMapping = {};
    newArray.forEach((index, i) => {
        if (index !== '') {
            const key = String(index);
            if (!contentMapping[key]) {
                contentMapping[key] = [];
            }
            contentMapping[key].push(originalContent[i]);
        }
    });

    // console.log(contentMapping)
        
    
    const [selectSource, setSelectSource] = useState(null);
    
    const handlePreviewClose = () => {
        setShowModal(false);
    };

    //for viewing the source pdf file
    const handleSourceClick = (sourceName) => {
        setSelectSource(sourceName);
        setShowModal(true);
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>Plagiarism</p>
                <p onClick={handleClose} className={styles.close}>Close <img src={close} alt='close' /></p>
            </div>
            <div className={styles.scoreBoard}>
                <div className={styles.firstRow} >
                    {/* <div style={{width: '100%', height: '100%'}}> */}
                    <ReactSpeedometer 
                        needleHeightRatio={0.7} 
                        fluidWidth={true}
                        minValue={0}
                        maxValue={100}
                        value={parseInt(overallScore)}
                        needleColor='black'
                        maxSegmentLabels={0}
                        width={150}
                        currentValueText=' '
                        height={100}
                        className={styles.speedometer}
                        />
                    {/* </div> */}
                    <div className={styles.scorePercent}>
                        <p className={styles.scoreTitle}>Score</p>
                        <p className={styles.score}>{`${overallScore}%`}</p>
                        <p className={styles.similarity}>Overall Similarity</p>
                    </div>
                </div> <hr className={styles.border} />
                <div className={styles.secondRow}>
                    <div>
                        <h6 className={styles.wordsCount}>{plagarismWordcount.total_word_count}</h6>
                        <p>Total Words</p>
                    </div>
                    <div>
                        <h6 className={styles.wordsCount}>{plagarismWordcount.matching_word_count}</h6>
                        <p>Matched Words</p>
                    </div>
                    <div>
                        <h6 className={styles.wordsCount}>{plagarismWordcount.source_count}</h6>
                        <p>Sources</p>
                    </div>
                </div><hr className={styles.border} />
                <div className={styles.thirdRow} >
                    {uniqueSourcesWithAverages.map((item, index) => {
                        const bgColor = getBackGroundColor(newArray[index] - 1);
                        const isDropdownOpen = openDropdown.includes(index);
                        return (
                            <div className={styles.sourceContainer}>
                                <div className={`${isDropdownOpen ? styles.sourceHeader : ''} d-flex`} >
                                    <div key={index}>
                                        <h6 className={styles.index} style={{ backgroundColor: bgColor }}>{index + 1}</h6>
                                        <p className={styles.sourceName} 
                                            style={{ color: isDropdownOpen ? '#FFF' : '' }}
                                            onClick={() => handleSourceClick(item.source)}>{item.source}</p>
                                        <h6 className={styles.percent}>{`${item.averageScore.toFixed(0)}%`}</h6>
                                    </div>
                                    <img src={dropdown} alt="dropdown icon"
                                        onClick={() => handlePlagiarismContent(index)}
                                        className={`${isDropdownOpen ? styles.active : ''}`}
                                    />
                                </div>
                                {isDropdownOpen && (
                                    <div className={`${styles.dropdown} d-inline`}>
                                        {/* {contentMapping[newArray[index]].map((content, idx) => (
                                                <React.Fragment key={idx} >
                                                    {highlightMatchedWords(content, idx)}
                                                </React.Fragment>   
                                        )
                                        )} */}
                                        {selectedIndex !== null && contentMapping[selectedIndex+1].map((content, idx) => {
                                           return (
                                               <p key={idx}>
                                                   {content}
                                               </p>
                                           )
                                       }
                                       )}
                                    </div>
                                )}
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <Preview show={showModal} handleClose={handlePreviewClose} onSelectPath={selectSource}/>
        </div>
    )
}
export default PlagiarismPanel;