import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from './Footer.module.css';
import cLogo from '../../../src/Assets/cog_prim_lg_hrz_r_rgb_rev_2022.png'

export const NavFooter = () => {
    return (
        <footer>
            <div className="container-fluid">
                <Row>
                    <Col lg={6}>
                        <img src={cLogo} alt="logo" className={styles.cLogo}/>
                    </Col>
                    <Col className="justify-content-end" lg={6}>
                        <p className={styles.footerText}>©2024 Cognizant. All rights reserved.</p>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}
