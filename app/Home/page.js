
'use client';
import { Row, Col, Menu } from "antd";
import Image from "next/image";
import cwlogo from "../assets/images/cwlogo.svg";
import { useRouter, useParams } from "next/navigation";

const SideMenu = () => {
    const router = useRouter();
    const params = useParams();


    const slug = params?.slug;

    const handleSitesClick = () => {
        router.push(`/sites`);
    };

    const handlePageClick = () => {
        router.push(`/sites/${slug}/pages`);
    };

    const handleBlogClick = () => {
        router.push(`/sites/${slug}/posts`);
    };

    const handleFormClick = () => {
        router.push(`/sites/${slug}/forms`);
    };

    return (
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
                            <Menu.Item style={{ width: '70px', height: "2.4rem", whiteSpace: "normal", textOverflow: 'inherit !important' }} onClick={handlePageClick}>
                                Pages
                            </Menu.Item>
                            <Menu.Item style={{ width: '70px', height: "2.4rem", textOverflow: 'inherit !important' }} onClick={handleBlogClick}>
                                Posts
                            </Menu.Item>
                            <Menu.Item style={{ width: '70px', height: "2.4rem", textOverflow: 'inherit !important' }} onClick={handleFormClick}>
                                Forms
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Col>
        </Row>
    );
}

export default SideMenu;








