import React from 'react';
import styles from './share.module.css';
import { Modal } from 'react-bootstrap';
import close from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Close.svg';
import copy from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Component 170_4.svg';
import userProfile from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Mask Group 1.jpg';
import search from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41882.svg';
import collab from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41896.svg';
import link from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41901.svg';
import arrow from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41721.svg';

const Share = ({ show, handleClose, handleCrossClose }) => {
    return (
        <Modal className={styles.modal} show={show} size='lg' centered>
            <Modal.Header className={`${styles.header}`}>
                <h1 className={styles.project}>Invite others</h1>
                <img src={close} alt='close' onClick={handleCrossClose} className={styles.close} />
            </Modal.Header>
            <Modal.Body >
                <div className={styles.modalBody}>
                        <form class="d-flex" className={styles.search}>
                            <input  type="search" placeholder="Add emails or people" /><img src={search} alt='search'/>
                        </form>
                        <p className={styles.subtitle}>Only those invited can open the link to this.</p> <hr/>
                        <div className={styles.row}>
                            <p className={styles.username}><img src={userProfile} alt='user profile'/>Code Lubars (You)</p>
                            <h6 className={styles.admin}>Admin</h6>
                        </div><hr/>
                        <div className={styles.row}>
                            <p className={styles.collab}><img src={collab} alt='collaboration'/>Collaboration</p>
                            <button className={styles.accessBtn}>No access <img src={arrow} alt='dropdown icon'/></button>
                        </div><hr/>
                        <div className={styles.row}>
                            <p className={styles.link}><img src={link} alt='link'/>Anyone with the link</p>
                            <button className={styles.viewBtn}>View <img src={arrow} alt='dropdown icon'/></button>
                        </div><hr/>
                        <div className={styles.lastRow}>
                            <p>https://subh.app/docs/Photography-Portfolio-for-Name-rw5lewu618myq4d </p>
                            <img src={copy} alt='copy'/>
                        </div><hr/>
                        <div>
                            <button className={styles.done} onClick={handleClose}>Done</button>
                        </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Share;