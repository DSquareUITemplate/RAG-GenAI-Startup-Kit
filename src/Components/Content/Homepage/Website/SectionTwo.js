import React, { useState, useEffect } from 'react';  
import { Container, Row, Col } from 'react-bootstrap';  
import styles from './SectionTwo.module.css';  
import { FaTrash } from 'react-icons/fa';  
import { FaTimes } from 'react-icons/fa';  

const SectionTwo = ({ onFilesSelected }) => {  
  const [selectedFiles, setSelectedFiles] = useState([]);  
  const [checkedFiles, setCheckedFiles] = useState({});  
  
  useEffect(() => {  
    // Call the onFilesSelected callback with the files that are currently checked  
    const currentlySelectedFiles = selectedFiles.filter(file => checkedFiles[file.name]);  
    onFilesSelected(currentlySelectedFiles);  
  }, [checkedFiles, selectedFiles, onFilesSelected]);  
  
  const handleFileUpload = (event) => {  
    const newFiles = Array.from(event.target.files);  
    const updatedFiles = [...selectedFiles, ...newFiles];  
    setSelectedFiles(updatedFiles);  
    // Automatically mark new files as checked  
    const newCheckedFiles = { ...checkedFiles };  
    newFiles.forEach(file => {  
      if (!(file.name in newCheckedFiles)) {  
        newCheckedFiles[file.name] = true; // Default new files to checked  
      }  
    });  
    setCheckedFiles(newCheckedFiles);  
  };  
  
  const handleDelete = (index) => {  
    const fileToDelete = selectedFiles[index];  
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);  
    setSelectedFiles(updatedFiles);  
    // Remove the file from checkedFiles state  
    const updatedCheckedFiles = { ...checkedFiles };  
    delete updatedCheckedFiles[fileToDelete.name];  
    setCheckedFiles(updatedCheckedFiles);  
  };  
  
  const handleCheckboxChange = (fileName, isChecked) => {  
    setCheckedFiles(prevCheckedFiles => ({  
      ...prevCheckedFiles,  
      [fileName]: isChecked,  
    }));  
  };  
  
  return (  
    <Container className={styles.SectionTwo}>  
      <Row>  
        <Col lg={12}>  
          <label htmlFor="fileInput" className={styles.uploadButton}>  
            Please a Select File
          </label>  
          <input  
            type="file"  
            id="fileInput"  
            multiple  
            style={{ display: 'none' }}  
            onChange={handleFileUpload}  
          />  
          {/*<ul>  
            {selectedFiles.map((file, index) => (  
              <li key={index}>{file.name}</li>  
            ))}  
            </ul> */} 
        </Col>  
      </Row>  
      <Row>  
        <Col lg={12}>  
          {selectedFiles.map((file, index) => (  
            <div key={index} className={styles.fileItem}>  
              <input  
                type="checkbox"  
                id={`file-${index}`}  
                name={file.name}  
                checked={!!checkedFiles[file.name]}  
                onChange={(e) => handleCheckboxChange(file.name, e.target.checked)}  
              />  
              <label htmlFor={`file-${index}`}>{file.name}</label>  
              <button onClick={() => handleDelete(index)} className={styles.deleteButton}>  
              <FaTimes />
              </button>  
            </div>  
          ))}  
        </Col>  
      </Row>  
    </Container>  
  );  
};  
  
export default SectionTwo;  
