import React, {useState,setOutput,props} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Section1.module.css';
import layout from '../../../Assests/Vector.svg';
import axios from 'axios';
import SectionTwo from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Components/Content/Homepage/Website/SectionTwo';
import claims from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/claims.svg';
import { BASE_URL_1 } from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/api';
 
const SectionOne = ({data,onchatsession,onsummary,onCompare , onPlagarism, onClaimsClick,onToggleChat,props, onPlagarismBtnClick, onPlagarismWordCount,totalWords,onReceiveFiles,onTextextract}) => {
    const [plagarismDisabled, setPlagarismDisabled] = useState(false);
   
        // Display the comparison results in SectionThree (implementation details in SectionThree.js)
        const handleClick = () => {  
            // Calling the onToggleChat function passed as a prop  
            props.onToggleChat();}
          
    {/*const handlePlagiarism = async () => {
        setPlagarismDisabled(true)
        try {
            
            const dataContent = data?.message?.message?.result;

            const queryParams = `faq_content=${(JSON.stringify({ result: dataContent }))}`;
            const url = `${BASE_URL_1}/plagiarism?${queryParams}`;
            console.log(url)
            const response = await axios.get(url, { headers: { "Content-Type": "application/json" } })
            const result = response?.data?.plagiarism_content?.plagiarism_count_metainfo;
            const plagarismResult = response?.data?.plagiarism_content?.question_answer_pairs;
            onPlagarism(plagarismResult);
            onPlagarismWordCount(result);
            console.log('PLAGIARISM RESPONSE' ,response);
            onPlagarismBtnClick();
            setPlagarismDisabled(false)
        } catch (error) {
            console.error('Error:', error);
            setPlagarismDisabled(false);
        } 
    };*/}
     
    return (
        <div className={styles.SectionOne}>
            <Row>
                <Col className={styles.leftElements}>
                    
                    {/*<div className={`${!plagarismDisabled ? styles.plagarism : styles.disabled}`} 
                        onClick={handlePlagiarism} 
                        aria-disabled={plagarismDisabled}>
                            <img src={plagarism}alt='plagiarism' />
                            <p>Plagiarism</p>
                    </div>
                    <div className={styles.format}>
                        <img src={format} alt='text format'/>
                        <p>Summarize</p>
    </div>*/}
                    <div className={styles.layout} onClick={onTextextract}>
                        <img src={layout}alt='add layout' />
                        <p>Image to Text Extractor</p>
                        
                    </div>
                    {/* <div className={styles.layout} >
                        <img src={layout}alt='add layout' />
                        <p>Embeddings</p>                        
                    </div> */}
                    <div className={styles.layout}  onClick={onsummary}>
                        <img src={layout}alt='add layout' />
                        <p>Summary</p>                        
                    </div>
                    {/*<div className={styles.media}>
                        <img src={media} alt='multimedia'/>
                        <p>Validate</p>
</div>*/}
                    <div className={styles.claims} onClick={onchatsession}>
                        <img src={claims} alt='claims check'/>
                        <p>Q&A</p>
                    </div>
                    <div className={styles.claims} onClick={onCompare}>
                        <img src={claims} alt='claims check'/>
                        <p>Table Comparator</p>
                    </div>
                    <div className={styles.claims} onClick={onchatsession}>
                        <img src={claims} alt='claims check'/>
                        <p>Syn Data Generator</p>
                    </div>
                </Col>
            </Row>
            {/* <ClaimsCheckModal showModal={showModal} handleClose={handleCloseModal} data={data} /> */}
        </div>
    )

    }
    export default SectionOne;