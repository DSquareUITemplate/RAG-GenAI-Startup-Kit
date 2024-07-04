import React, { cloneElement, useState,useEffect } from 'react';  
// import { useNavigate } from 'react-router-dom';  
import { Container, Row, Col, Button, Form, Card, CardBody } from 'react-bootstrap';  
import CreateProjectModal from './CreateProjectModal';  
import styles from './Content.module.css';
//import plus from '../../../Assets/group '  
//import plus from '../../../../src/Assets/Group 41720.svg';  
//import fav from '../../../../src/Assets/Group 41728.svg';  
//import created from '../../../../src/Assets/Group 41728 (1).svg';  
///import viewed from '../../../../src/Assets/Group 41728 (2).svg';  
//import all from '../../../../src/Assets/Group 41728 (3).svg';  
//import order from '../../../../src/Assets/Group 41663.svg';  
//import list from '../../../../src/Assets/Group 41458.svg';  
//import arrow from '../../../Assets/Group 41721.svg';  
//import grid from '../../../../../src/Assets/Group 41458 (1).svg';  
import { useNavigate } from "react-router-dom";  
import WebHeader from './Website/WebHeader';  
import SectionOne from './Website/Section1';  
import SectionTwo from './Website/SectionTwo';  
import SectionThree from './Website/SectionThree'; 
import CombinedFaq from './Website/CombinedFaq';  
import Chat from './Website/Chat';  
import html2pdf from 'html2pdf.js';  
import pptxgen from 'pptxgenjs';  
import { saveAs } from 'file-saver';  
import ClaimsCheck from './Website/Claims';  
import PlagiarismPanel from './Website/Plagiarismpanel';  //C:\Users\909543\Downloads/genaiui_sample/Genai_UI
import Spinner from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Components/Content/Homepage/Website/spinner.js'; 

const Content = () => {const [isFaqDone, setIsFaqDone] = useState(false); 
    const [summaryData, setsummaryData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [isCombinedfaqVisible, setisCombinedfaqVisible] = useState(false);  
    const [faqData, setFaqdata] = useState({});  
    const [selectedFaq, setSelectedFaq] = useState("");  
    const [claimsClick, setClaimsClick] = useState(false);  
    const [plagarism, setPlagarism] = useState([]);  
    const [plagarismCount, setPlagarismCount] = useState([]);  
    const [showPlagiarismPanel, setShowPlagiarismPanel] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const handleToggleChat = () => {  
        setShowChat(prev => !prev);  
      };  
    const [inputText, setInputText] = useState('');  
    const [messages, setMessages] = useState([]);  
    const [previousResponse, setPreviousResponse] = useState("");  
    const [selectedFilesForComparison, setSelectedFilesForComparison] = useState([]);    
    const [comparisonResult, setComparisonResult] = useState(''); 
    const [comparisonResult1, setComparisonResult1] = useState('');    
    const [selectedFilesText, setSelectedFilesText] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    //const compareFiles = () => {    
      // Dummy comparison logic    
     // const result = `Comparing ${selectedFilesForComparison.length} files...`;    
     // setComparisonResult(result);    
    //}; 
    const [selectedSchedule, setSelectedSchedule] = useState('');
    useEffect(() => {  
        if (selectedSchedule) { // Check to make sure selectedSchedule is not empty  
            compareFiles1();  
        }  
    }, [selectedSchedule]);


    //
    //const [selectedSchedule, setSelectedSchedule] = useState('');  
    const handleScheduleSelected = (schedule) => {  
        setSelectedSchedule(schedule);  
    };  
    const [isTableComparatorClicked, setIsTableComparatorClicked] = useState(false);  
  
    const handleTableComparatorClick = () => {  
        setIsTableComparatorClicked(true);  
    };  
    const handleTableComparatorClick1 = () => {  
        setIsTableComparatorClicked(false);  
    };  
    const compareFiles1 = async () => {
        //setSelectedSchedule(schedule); 
        //alert(`${selectedSchedule}`);  
        //if (selectedFilesForComparison.length !== 2) {  
        //    alert("Please select exactly two files for comparison.");  
        //    return;  
        //}
        setIsLoading(true);  
      console.log("comparefiles1");
        const formData = new FormData();  
        formData.append('pdf1', selectedFilesForComparison[0]);  
        formData.append('pdf2', selectedFilesForComparison[1]);  
        formData.append('schedule', selectedSchedule); // Append selected schedule  
        
        try {  
            //alert(`${selectedSchedule}`);
            const response1 = await fetch('https://sampleapp.azurewebsites.net/upload1', { // Adjust the URL based on your backend endpoint  
            //const response1 = await fetch('https://ragkit.azurewebsites.net/upload1', { // Adjust the URL based on your backend endpoint  
                method: 'POST',  
                body: formData,  
            });  
      
            if (!response1.ok) {  
                throw new Error('Network response was not ok');  
            }  
      
            const result1 = await response1.json();
            setIsLoading(false);   
            setComparisonResult1(result1.comparison_result1);
            setIsLoading(false);  
        } catch (error) {  
            console.error("Error comparing files:", error);  
            alert(`An error occurred . ${error}`);  
        }
        setIsLoading(false);   
    };  
    
    const compareFiles = async () => {
        //setIsLoading(true);  
        if (selectedFilesForComparison.length !== 2) {  
            alert("Please select exactly two files .");  
            return;  
        }
        
        handleTableComparatorClick();
        setIsLoading(true);  
      
        const formData = new FormData();  
        formData.append('pdf1', selectedFilesForComparison[0]);  
        formData.append('pdf2', selectedFilesForComparison[1]);  
        
        try {  
            const response = await fetch('https://sampleapp.azurewebsites.net/upload', { // Adjust the URL/port based on your Flask app  
            //const response = await fetch('http://127.0.0.1:5000/upload', { // Adjust the URL/port based on your Flask app  
            
                method: 'POST',  
                body: formData,  
            });  
              
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
      
            const result = await response.json();  
            const emptyValue = "";  
        setApiData(emptyValue);
            setComparisonResult(result.comparison_result);
            setIsLoading(false); // Assuming you have a state to store this  
        } catch (error) {  
            console.error("Error uploading files:", error);  
            alert(`An error occurred . ${error}`);  
        }
           
    };


    function displayExtractedText(data) {
        if (!data || !data.length) {
          // Handle empty or invalid data gracefully
          console.warn("No text data extracted");
          return;
        }
      
        // Access the extracted text from the first element in the data array
        const extractedText = data[0].text;
      
        // Create a container element (e.g., a `<div>`) to hold the text
        const textContainer = document.createElement('div');
        textContainer.classList.add('extracted-text'); // Add a CSS class for styling (optional)
      
        // Escape any HTML characters in the text to prevent XSS vulnerabilities
        const escapedText = escapeHtml(extractedText);
      
        // Set the text content of the container element
        textContainer.innerHTML = escapedText;
      
        // Append the container element to an appropriate location in your HTML structure
        const targetElement = document.getElementById('your-target-id'); // Replace with your desired element ID
        targetElement.appendChild(textContainer);
      }
      
      function escapeHtml(text) {
        const map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
      }

    const textextraction = async()=>{ 
        //handleToggleChat();
        if (selectedFilesForComparison.length !== 1) {  
            alert("Please select exactly one file.");  
            return;  
        }
        setIsLoading(true);       
        const formData = new FormData();  
        formData.append('pdf1', selectedFilesForComparison[0]);       
        try {  
            //const response = await fetch('http://127.0.0.1:5000/textextract1', { // Adjust the URL/port based on your Flask app  
            const response = await fetch('https://sampleapp.azurewebsites.net/textextract1', { // Adjust the URL/port based on your Flask app  
            method: 'POST' ,
                body: formData,  
            });   
            console.log(response);   
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }       
            // const result=await response.text();  
            // console.log(result);
            // setApiData(result); 
            const emptyValue = ""; 
            handleTableComparatorClick1(); 
            setComparisonResult(emptyValue);
            setComparisonResult1(emptyValue);
            const result = await response.text();   
            const parsedResult = JSON.parse(result);  
            console.log(parsedResult);  
            setApiData(parsedResult);  
            setIsLoading(false);       

            //const result = await response.json(); // Parse the response as JSON

    // Display the extracted text on the webpage
    //displayExtractedText(result);
        } catch (error) {  
            console.error("Error uploading files:", error);  
            alert(`An error occurred . ${error}`);  
        }           
    };
    const summary = async()=>{ 
        if (selectedFilesForComparison.length !== 1) {  
            alert("Please select exactly one file.");  
            return;  
        }
        console.log("hi")
        setIsLoading(true);       
        const formData = new FormData();  
        formData.append('pdf1', selectedFilesForComparison[0]);       
        try {  
            //const response = await fetch('http://127.0.0.1:5000/summary', { // Adjust the URL/port based on your Flask app  
            const response = await fetch('https://sampleapp.azurewebsites.net/summary', { // Adjust the URL/port based on your Flask app  
            method: 'POST' ,
                body: formData,  
            });  
            console.log(response);   
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }       
            // const result=await response.text();  
            // console.log(result);
            // setApiData(result); 
            const emptyValue = "";  
            handleTableComparatorClick1();
            setComparisonResult(emptyValue);
            setComparisonResult1(emptyValue);
            const result = await response.text();   
            const parsedResult = JSON.parse(result);  
            console.log(parsedResult);  
            setApiData(parsedResult);  
            setIsLoading(false);       

            //const result = await response.json(); // Parse the response as JSON

    // Display the extracted text on the webpage
    //displayExtractedText(result);
        } catch (error) {  
            console.error("Error uploading files:", error);  
            alert(`An error occurred. ${error}`);  
        }           
    };
    const questionandanswer = ()=>{ 
        setShowChat(prev => !prev);  
        console.log("hi");
        if (selectedFilesForComparison.length !== 1) {  
            alert("Please select exactly one file");  
            return;  
        }       
        else{
            //setSelectedFilesText=selectedFilesForComparison[0];
            setSelectedFilesText(selectedFilesForComparison[0]);
        }     

    };
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
            {isLoading && <Spinner />}  
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
                        onPlagarismWordCount={handlePlagiarismCount}
                        onToggleChat={handleToggleChat}
                        onCompare={compareFiles}
                        onTextextract={textextraction}
                        onchatsession={questionandanswer}
                        onsummary={summary} />  
                          
                </div>  
                {(!isFaqDone && !claimsClick) &&  
                    <div className={`${styles.sectionTwo}`}>  
                        <SectionTwo   
                            onFaqDone={handleFaqDone}   
                            data={data}   
                            onSelectFaq = {handleFaq}   
                            onSelectFaqPath={selectedFaq}
                            onFilesSelected={setSelectedFilesForComparison}/>
                              
                    </div>}
                    
                    <div className={`${styles.sectionThree} ${showChat ? 'sectionThreeExpanded' : ''} pe-0`}>
        {showChat ? (  
          <Chat 
          onFaqdataChange={handlefaqdata}   
                        onSelectFaqPath={selectedFaq}   
                        inputText={inputText}                        
                        setInputText={setInputText}  
                        messages={messages}  
                        setMessages={setMessages}  
                        previousResponse={previousResponse}  
                        setPreviousResponse={setPreviousResponse} 
                        selectedFilesText={selectedFilesForComparison[0]}/* Pass necessary props */ />  
        ) : (  
          <SectionThree /* Pass necessary props */ 
                            data={data} 
                            data={comparisonResult}  
                            plagarismResult={plagarism}  
                            comparisonResult={comparisonResult}
                            comparisonResult1={comparisonResult1}
                            onScheduleSelected={handleScheduleSelected} // Pass handleScheduleSelected separately  
                            compareFiles1={compareFiles1} // Pass compareFiles1 as a separate prop  
                            selectedSchedule={selectedSchedule}
                            apiData={apiData}
                            isTableComparatorClicked={isTableComparatorClicked}/>  
        )}  
      </div>
                {/*{(!isFaqDone && !claimsClick ) &&  
                    <div className={`${styles.sectionThree} pe-0`}>  
                        <SectionThree   
                            data={data} 
                            data={comparisonResult}  
                            plagarismResult={plagarism}  
                            comparisonResult={comparisonResult}
                            comparisonResult1={comparisonResult1}
                            onScheduleSelected={handleScheduleSelected} // Pass handleScheduleSelected separately  
                            compareFiles1={compareFiles1} // Pass compareFiles1 as a separate prop  
                            selectedSchedule={selectedSchedule}
                            //onScheduleSelected={handleScheduleSelected}

                            //<SectionThree comparisonResult={comparisonResult} /> 
                            // sourceOfPlagiarism = {plagiarismSource}  
                            />  
                               
                    </div>  
                }  */}
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
                {/*
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
                        selectedFilesText={selectedFilesText} 
                                  />  
                </div> } 

*/ } 
            </div>  
            
         
         
        </div>  
           
    );  
    };  
  
  
export default Content;