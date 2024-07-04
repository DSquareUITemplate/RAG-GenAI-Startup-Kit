import React, { cloneElement, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './Website.module.css';
import WebHeader from './WebHeader';
import SectionOne from './Section1';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import CombinedFaq from './CombinedFaq';
import Chat from './Chat';
import html2pdf from 'html2pdf.js';
import pptxgen from 'pptxgenjs';
import { saveAs } from 'file-saver';
import ClaimsCheck from './Claims';
import PlagiarismPanel from './Plagiarismpanel';
// import mammoth from 'mammoth';


const Website = () => {
    const [isFaqDone, setIsFaqDone] = useState(false);
    const [isCombinedfaqVisible, setisCombinedfaqVisible] = useState(false);
    const [faqData, setFaqdata] = useState({});
    const [selectedFaq, setSelectedFaq] = useState("");
    const [claimsClick, setClaimsClick] = useState(false);
    const [plagarism, setPlagarism] = useState([]);
    const [plagarismCount, setPlagarismCount] = useState([]);
    const [showPlagiarismPanel, setShowPlagiarismPanel] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [previousResponse, setPreviousResponse] = useState("");


    const handleFaqDone = () => {
        setIsFaqDone(true);
        setisCombinedfaqVisible(true);
    };


    const handleBack = () => {
        setIsFaqDone(false);
        setisCombinedfaqVisible(false);
        setClaimsClick(false)
    };

    const handlefaqdata = (newData) => {
        setFaqdata({ message: newData });
    }

    const handleExportToPDF = () => {
        const contentElement = document.getElementById('faqContent');
        if (contentElement) {
            const editingElements = contentElement.querySelectorAll('.editing-element');
            editingElements.forEach(element => {
                element.style.display = 'none';
            });

            const pdfOptions = {
                margin: 10,
                filename: 'FAQ.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3, scrollY: 0 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            html2pdf(contentElement, pdfOptions);

        }
        console.log(contentElement)
    };

    const handleExportToPPT = async () => {
        const ppt = new pptxgen();
        const contentElement = document.getElementById('faqContent');

        if (contentElement) {
            const faqItem = contentElement.querySelectorAll('.faqItem');

            faqItem.forEach((faqItem, index) => {
                const questionElement = faqItem.querySelector('.question');
                const answerElement = faqItem.querySelector('.answer');

                if (questionElement && answerElement) {
                    const question = questionElement.innerHTML.trim();
                    const answer = answerElement.innerHTML.trim();

                    const questionSlide = ppt.addSlide();
                    const answerSlide = ppt.addSlide();
                    questionSlide.text(question, { x: 1, y: 1, w: '90%', h: 1 }, {lineBreaks: true})
                    answerSlide.text(answer, { x: 1, y: 1, w: '90%', h: 3 }, {lineBreaks: true})
                }
                console.log(questionElement, answerElement)
            })
            ppt.writeFile({ fileName: 'FAQ' });
        }
    }
    const data = faqData;

    const handleFaq = (selectedFaqName) => {
        setSelectedFaq(selectedFaqName);
    }
    // console.log(selectedFaq);

    const handlePlagiarism = (data) => {
        setPlagarism(data);
    }
    
    const handlePlagiarismCount = (wordCount) => {
        setPlagarismCount(wordCount)
    }


    const handleClaimsClick = () => {
        setClaimsClick(true);
    }

    const handlePlagiarismVisibilty = () => {
        setShowPlagiarismPanel(true)
    }

    const handlePlagiarismPanelClose = () => {
        setShowPlagiarismPanel(false);
    }

    // console.log('webiste state', {inputText, messages})

    return (
        <div className={`${styles.website} container-fluid`}>
            <div>
                <div className={`${styles.webHeader} ps-0`}>
                    <WebHeader onExportToPDF={handleExportToPDF} 
                    onExportToPPT={handleExportToPPT} 
                    // onExportToDoc={handleExportToDoc}
                    />
                </div>
            </div>
            <div className={styles.secondRow}>
                <div className={`${styles.sectionOne} ps-0`}>
                    <SectionOne 
                        data={data} 
                        onPlagarism={handlePlagiarism} 
                        onClaimsClick={handleClaimsClick} 
                        onPlagarismBtnClick = {handlePlagiarismVisibilty} 
                        onPlagarismWordCount={handlePlagiarismCount}/>
                </div>
                {(!isFaqDone && !claimsClick) &&
                    <div className={`${styles.sectionTwo}`}>
                        <SectionTwo 
                            onFaqDone={handleFaqDone} 
                            data={data} 
                            onSelectFaq = {handleFaq} 
                            onSelectFaqPath={selectedFaq}/>
                    </div>}
                {(!isFaqDone && !claimsClick ) &&
                    <div className={`${styles.sectionThree} pe-0`}>
                        <SectionThree 
                            data={data} 
                            plagarismResult={plagarism}
                            // sourceOfPlagiarism = {plagiarismSource}
                            />
                    </div>
                }
                {(isCombinedfaqVisible && !claimsClick) &&
                    <div className={`${styles.combinedFaq} pe-0`}>
                        <CombinedFaq 
                            onBack={handleBack} />
                    </div>
                }
                {claimsClick && 
                    <div className={`${styles.claims} pe-0`}>
                        <ClaimsCheck 
                            data={data} 
                            onBack={handleBack}/>
                    </div>
                }
                {showPlagiarismPanel && !claimsClick &&
                    <div className={`${styles.sectionFour} ms-0 ps-0`}>
                        <PlagiarismPanel 
                            onPanelClose = {handlePlagiarismPanelClose} 
                            plagarismResult={plagarism} 
                            plagarismWordcount={plagarismCount}
                            // sourceArray={handlePlagiarismSource}
                            />
                    </div>
                }
                {(!claimsClick && !showPlagiarismPanel) &&
                <div className={`${styles.sectionFour} ms-0 ps-0`}>
                    <Chat onFaqdataChange={handlefaqdata} 
                        onSelectFaqPath={selectedFaq} 
                        inputText={inputText}
                        setInputText={setInputText}
                        messages={messages}
                        setMessages={setMessages}
                        previousResponse={previousResponse}
                        setPreviousResponse={setPreviousResponse}
                        />
                </div>
                }
            </div>
        </div>
    );
};

export default Website;