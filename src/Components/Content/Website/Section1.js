import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Section1.module.css';
import format from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41750.svg';
import plagarism from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41750 (1).svg';
import addTheme from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41750 (2).svg';
import media from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Path 18467.svg';
import layout from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Vector.svg';
import axios from 'axios';
import claims from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/claims.svg';
import { BASE_URL_1 } from '../../../api';

const SectionOne = ({data, onPlagarism, onClaimsClick, onPlagarismBtnClick, onPlagarismWordCount}) => {
    const [plagarismDisabled, setPlagarismDisabled] = useState(false);
 
    const handleClaims = () => {
        onClaimsClick();
    };

    const handlePlagiarism = async () => {
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
    };


    return (
        <div className={styles.SectionOne}>
            <Row>
                <Col className={styles.leftElements}>
                    <div className={styles.addTheme}>
                        <img src={addTheme}alt='add theme' />
                        <p>Add Theme</p>
                    </div>
                    <div className={`${!plagarismDisabled ? styles.plagarism : styles.disabled}`} 
                        onClick={handlePlagiarism} 
                        aria-disabled={plagarismDisabled}>
                            <img src={plagarism}alt='plagiarism' />
                            <p>Plagiarism</p>
                    </div>
                    <div className={styles.format}>
                        <img src={format} alt='text format'/>
                        <p>Text Format</p>
                    </div>
                    <div className={styles.layout}>
                        <img src={layout}alt='add layout' />
                        <p>Add Layout</p>
                    </div>
                    <div className={styles.media}>
                        <img src={media} alt='multimedia'/>
                        <p>Multimedia</p>
                    </div>
                    <div className={styles.claims} onClick={handleClaims}>
                        <img src={claims} alt='claims check'/>
                        <p>Claims Check</p>
                    </div>
                </Col>
            </Row>
            {/* <ClaimsCheckModal showModal={showModal} handleClose={handleCloseModal} data={data} /> */}
        </div>
    )
}
export default SectionOne;