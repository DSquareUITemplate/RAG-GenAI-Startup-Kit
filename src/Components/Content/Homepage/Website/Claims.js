import React, { useState } from 'react';
import {  Table } from 'react-bootstrap';
import styles from './Claims.module.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import search from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41882.svg';
import back from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41478.svg';
import save from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 42018.svg';
import edit from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Pen.svg';
import { BASE_URL_1, BASE_URL_2 } from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/api';

const ClaimsCheck = ({ data, onBack }) => {
    const [brandName, setBrandName] = useState('');
    const [claimsData, setClaimsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedClaimsData, setEditedClaimsData] = useState({});
    const [originalClaimsData, setOriginalClaimsData] = useState([]); // Added originalClaimsData state

    const handleBrandNameChange = (e) => {
        setBrandName(e.target.value);
    };

    const handleBack = () => {
        onBack();
    }

    // console.log(data);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            const dataContent = data?.message?.message?.result;
            console.log(dataContent)
            const queryParams = `brand=${(brandName)}&faq_content=${(JSON.stringify({ result: dataContent }))}`;
            const url = `${BASE_URL_1}/claims?${queryParams}`;

            console.log(url)
            const response = await axios.get(url, { headers: { "Content-Type": "application/json" } })

            console.log(response.data);
            const responseData = response?.data;
            console.log(responseData.claims);
            const claimcheckdata = responseData?.claims
            setClaimsData(claimcheckdata);

        } catch (error) {
            console.error('Error:', error);

        } finally {
            setIsLoading(false);
        }
    };

    const handlekeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    let [color, setColor] = useState("#000048");

    const handleEdit = () => {
        setEditMode(!editMode);
        setOriginalClaimsData([...claimsData]);
    };

    const handleSave = () => {
        const updatedClaimsData = originalClaimsData.map((originalClaim, index) => {
            return editedClaimsData[index] || originalClaim;
        });
    
        setClaimsData(updatedClaimsData);

        // Reset the edit mode and clear the editedClaimsData state
        setEditMode(false);
        setEditedClaimsData({});
    };
      
    console.log(claimsData)
    const [documentUrl, setDocumentUrl] = useState('');
    const handleViewSource = async() => {
        const sourceName = 'claims_check/claims_repository.xlsx';

        try {
            const response = await fetch(`${BASE_URL_2}/faq`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // credentials: 'include',
                body: JSON.stringify({ sourcePath: sourceName }),
            });
            console.log('response', response);
            if (!response.ok) {
                throw new Error('failed to fetch document')
            }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            // const fullUrl = `${documentUrl}/gbg-neuro-genai/claims_repository.xlsx`;  // Replace with the actual path to your Excel file
            const gcpBaseUrl = 'https://storage.googleapis.com/gbg-neuro-genai/claims_repository.xlsx';  // Replace with your GCP storage bucket URL
            
            
            // Construct the full URL for the Excel file
            const fullUrl = `${url}/claims_repository.xlsx`;
 
            // Open the Excel file in a new tab
            window.open(url, '_blank', 'noopener,noreferrer');
            console.log(blob)
            // window.open(url, '_blank', 'noopener,noreferrer')
            setDocumentUrl(url)
            console.log('claims excel file', url)
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    return (
        <div className={`${styles.container}`}>
            <div className={styles.containerBorder}>
                <div className={styles.header}>
                    <p className={styles.back} onClick={handleBack}><img src={back} alt="Back" />Back</p>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.content}>
                        <input
                            type="text"
                            placeholder="Enter brand name"
                            value={brandName}
                            onKeyDown={handlekeyPress}
                            onChange={handleBrandNameChange}
                            className={styles.input}
                        /> <img src={search} className={`${brandName.trim() === '' ? styles.searchDisabled : styles.search}`} alt='search' onClick={handleSubmit} />
                    </div>
                    <div className={styles.edit_save}>
                        <p className={styles.edit} onClick={handleEdit}>
                            Edit <img src={edit} />
                        </p>
                        <p className={styles.save} onClick={handleSave}>
                            Save <img src={save} />
                        </p>
                    </div>
                </div>
                {/* <p type="button" className={`${brandName.trim() === '' ? styles.submitDisabled : styles.submit} p-2 `} onClick={handleSubmit} >Search</p> */}
                <div>
                    {isLoading ? (
                        <div className={styles.loader}>
                            <ClipLoader
                                color={color}
                                loading={isLoading}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader" />
                        </div>
                    ) : (
                            <div className={styles.claimsContent}>
                                {claimsData === 'No matching claims found!!!' ? (
                                    <p className={styles.claimMessage}>No matching claims found</p>
                                ) : (
                                    <div>
                                        {typeof claimsData === 'string' ? (
                                            <p className={styles.claimMessage}>{claimsData}</p>
                                        ) : (
                                            <div>
                                                {claimsData.length > 0 && (
                                                    <div className={styles.table}>
                                                        <Table bordered>
                                                            <thead>
                                                                <tr>
                                                                    <th>Sr.No</th>
                                                                    {Object.keys(claimsData[0]).map((key) => (
                                                                        <th key={key}>{key}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className={styles.tableBody}>
                                                                {claimsData.map((claim, index) => (
                                                                    <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                        <td>{index + 1}</td>
                                                                        {!editMode ? (
                                                                            <td style={{ textAlign: 'left' }}>{claim.Generated_content}</td>
                                                                        ) : (
                                                                            <td style={{ textAlign: 'left'}}>
                                                                                <textarea style={{ width: '350px',height: '100px', border: 'none', resize: 'none', overflow: 'hidden', outline: 'none', boxSizing: 'content-box', padding: '0', alignItems: 'center'}}
                                                                                    // type="text"
                                                                                    value={editedClaimsData[index]?.Generated_content || claim.Generated_content}
                                                                                    onChange={(e) => {
                                                                                        // Update the state with the edited data
                                                                                        setEditedClaimsData((prevData) => ({
                                                                                        ...prevData,
                                                                                        [index]: { ...claim, Generated_content: e.target.value },
                                                                                        }));
                                                                                    }}
                                                                                />
                                                                            </td>
                                                                        )}
                                                                        <td style={{ textAlign: 'left' }}>{claim.Claims_Repository}<a className={styles.viewSource}  
                                                                            onClick={handleViewSource}
                                                                            target='_blank'>View Source</a></td>
                                                                        <td>{claim.Similarity}</td>
                                                                        <td style={{ textAlign: 'left' }}>{claim.Differences}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default ClaimsCheck;