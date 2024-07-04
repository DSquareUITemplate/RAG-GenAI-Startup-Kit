import React from 'react';  
import { Container, Row, Col, Card,Form } from 'react-bootstrap';  
import styles from './SectionThree.module.css';  

const SectionThree = ({  isTableComparatorClicked,apiData,comparisonResult,comparisonResult1,onScheduleSelected,selectedSchedule,compareFiles1, setSelectedSchedule }) => {
    //const [selectedSchedule, setSelectedSchedule] = useState('');  
  
    const handleScheduleChange = (event) => {  
        const schedule = event.target.value;  
          
    onScheduleSelected(schedule); // This should update the parent state  
    //compareFiles1(); // Correctly using the prop passed from Content.js  
    };     
    let schedules = [];  
    if (typeof comparisonResult === 'string' ) {  
        schedules = comparisonResult.split(', ');  
    }
    const renderTable = () =>{
    if(apiData.length===0){
        return <p></p>
    }  
    // return (<p>{apiData[0].text}<br/>{apiData[0].word_count}</p>);
    return (<p>{apiData[0].text}</p>);
    };
    console.log(apiData) ;

   

    return (    
        <div className={styles.bgSectionThree}>    
            <Container className={`${styles.SectionThree}`}>    
                <Row>    
                    <Col lg={12}>    
                        <Card className={styles.sectionCard}>    
                            <Card.Body>    
                                <Card.Title className={styles.title}>Result</Card.Title>  

                                {isTableComparatorClicked && (  
                                    <Form.Select aria-label="Select Schedule" value={selectedSchedule} onChange={handleScheduleChange}>  
                                                <option>Select a Schedule</option>  
                                                {schedules.map((schedule, index) => (  
                                                    <option key={index} value={schedule}>{schedule}</option>  
                                                ))}  
                                            </Form.Select>
                                             
                                    )} 
                                     <div>
                                       {
                                        comparisonResult1 ? (  
                                            <p>{comparisonResult1}</p>  // Display comparison result if no schedules  
                                        ) : (  
                                            <p></p>  // Display message if no result  
                                        ) 
                                    } 
                                    </div>         
                                  

                                {renderTable()}

                            </Card.Body>    
                        </Card>    
                    </Col>    
                </Row>
                <div>        
    </div>                 
                </Container>  
        </div>  
    );  
};  
  
export default SectionThree;  
