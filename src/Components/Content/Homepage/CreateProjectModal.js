import React, { useState } from "react";
import { Modal, Row, Col, Form, Nav } from "react-bootstrap";
import Styles from './CreateProjectModal.module.css';
import arrow from '../../../Assets/Group 41721.svg';
import close from '../../../Assets/Close.svg';
import { useNavigate } from "react-router-dom";

const CreateProjectModal = ({ show, handleClose, handleCrossClose }) => {
    const [isLanguageActive, setisLanguageActive] = useState(false);
    const [isProjectActive, setisProjectActive] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const languageOptions = ["English", "Hindi", "German", "French", "Arabic"];
    const projectOptions = ["RTE", "Social", "Website", "Email", "DSA", "FAQ", "Custom"];
    const navigate = useNavigate();

    const handleLanguage = (e) => {
        setisLanguageActive(!isLanguageActive);
    }
    const handleProjectType = (e) => {
        setisProjectActive(!isProjectActive);
    }

    const handleCreate = () => {
        switch (selectedProject) {
            case 'FAQ':
                navigate('/faq');
                break;
            case 'Website':
                navigate('/website');
                break;
            default:
                break;
        }
        handleClose();
    }

    const isBtnDisabled = !selectedLanguage || !selectedProject;
    return (
        <Modal show={show} centered className={Styles.modal}>
            <Modal.Header className={`${Styles.header}`}>
                <h1 className={Styles.project}>Create New Project</h1>
                <img src={close} alt="close button" onClick={handleCrossClose} className={Styles.close} />
            </Modal.Header>
            <Modal.Body className={Styles.modalBody}>
                <Row>
                    <Col lg={6}>
                        <div>
                            <div className={`${Styles.language} ${isLanguageActive ? Styles.active : ''}`} onClick={handleLanguage}>{selectedLanguage || "Select Language"} <img src={arrow} alt="dropdown icon"/></div>
                            {isLanguageActive && (
                                <ul className={Styles.dropdownContent}>
                                    {languageOptions.map((langOption) => (
                                        <li key={langOption} className={Styles.dropdownList} onClick={(e) => {
                                            setSelectedLanguage(langOption);
                                            setisLanguageActive(false)
                                        }}>{langOption}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <div className={`${Styles.language} ${isProjectActive ? Styles.active : ''}`} onClick={handleProjectType}>{selectedProject || "Select Project Type"}<img src={arrow} alt="dropdown icon"/></div>
                            {isProjectActive && (
                                <ul className={Styles.dropdownContent}>
                                    {projectOptions.map((projOption) => (
                                        <li key={projOption} className={Styles.dropdownList} onClick={(e) => {
                                            setSelectedProject(projOption);
                                            setisProjectActive(false)
                                        }}>{projOption}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className="border-0 ">
                <p type="button" className={`${isBtnDisabled ? Styles.createDisabled : Styles.create} mt-0 p-2 `} onClick={handleCreate} disabled={`${isBtnDisabled} `}>Create</p>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateProjectModal;
