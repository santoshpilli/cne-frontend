
'use client';
import { Row, Col, Menu } from "antd";
import Image from "next/image";
import cwlogo from "../assets/images/cwlogo.svg";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'

const SideMenu = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Pages")
    const params = useParams();



    const slug = params?.slug;

    const handleSitesClick = () => {
        router.push(`/sites`);
        setActiveTab("Sites")
    };

    const handlePageClick = () => {
        router.push(`/sites/${slug}/pages`);
        setActiveTab('Pages')
    };

    const handleBlogClick = () => {
        router.push(`/sites/${slug}/posts`);
        setActiveTab('Posts')
    };

    const handleFormClick = () => {
        router.push(`/sites/${slug}/forms`);
        setActiveTab('Forms')
    };

    const handleLogout = () => {

        signOut("google")
        // router.push(`/signin`);
    }
    return (
        <>
            <Row>
                <Col span={2}>
                    <Menu mode="vertical" style={{ width: "5vw", height: "100vh" }}>
                        <Menu.Item>
                            <Image src={cwlogo} alt="Logo" />
                        </Menu.Item>
                        <Menu.Item style={{ height: "2.4rem" }} onClick={handleSitesClick}>
                            Sites
                        </Menu.Item>

                        {slug && (
                            <>
                                <Menu.Item style={{ width: '70px', height: "2.4rem", whiteSpace: "normal", textOverflow: 'inherit !important', backgroundColor: activeTab === "Pages" ? '#e6f4ff' : null, color: activeTab === "Pages" ? '#1677ff' : null }} onClick={handlePageClick}>
                                    Pages
                                </Menu.Item>
                                <Menu.Item style={{ width: '70px', height: "2.4rem", textOverflow: 'inherit !important', backgroundColor: activeTab === "Posts" ? '#e6f4ff' : null, color: activeTab === "Posts" ? '#1677ff' : null }} onClick={handleBlogClick}>
                                    Posts
                                </Menu.Item>
                                <Menu.Item style={{ width: '70px', height: "2.4rem", textOverflow: 'inherit !important', backgroundColor: activeTab === "Forms" ? '#e6f4ff' : null, color: activeTab === "Forms" ? '#1677ff' : null }} onClick={handleFormClick}>
                                    Forms
                                </Menu.Item>

                            </>
                        )}
                        <Menu.Item style={{ width: '70px', height: "2.4rem", textOverflow: 'inherit !important', backgroundColor: activeTab === "Forms" ? '#e6f4ff' : null, color: activeTab === "Forms" ? '#1677ff' : null }} onClick={handleLogout}>
                            LogOut
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
}

export default SideMenu;


























































