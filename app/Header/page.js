

'use client'
import { Row, Col } from "antd";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
// import "../app/globals.css";

const Navbar = () => {
    const sty = {
        description: "status bar keys styles in the status bar part",
        fontSize: "12px",
        overflowX: "hidden",
        position: "relative",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        backgroundColor: "#f2f2f2",
        borderRadius: "100px",
        marginRight: "7px",
        padding: "5px"
    };

    return (
        <Row className="border-b-2 py-2 px-4">
            <Col span={2}>
                <Image src={logo} alt="Logo" />
            </Col>
            <Col span={2}>

            </Col>
            <Col span={20}>

            </Col>
        </Row>
    );
};

export default Navbar;