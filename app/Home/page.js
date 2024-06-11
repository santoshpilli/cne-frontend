
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














// 'use client';
// import { useState, useEffect } from 'react';
// import { Row, Col, Menu } from 'antd';
// import Image from 'next/image';
// import cwlogo from '../assets/images/cwlogo.svg';
// import { useRouter, useParams } from 'next/navigation';

// const SideMenu = () => {
//     const router = useRouter();
//     const params = useParams();
//     const [selectedMenuItem, setSelectedMenuItem] = useState('');

//     const slug = params?.slug;

//     useEffect(() => {
//         const path = router.asPath || router.pathname;
//         // if (pathname === '/sites') {
//         //     setSelectedMenuItem('Sites');
//         // } else if (pathname === `/sites/${slug}/pages`) {
//         //     setSelectedMenuItem('Pages');
//         // } else if (pathname === `/sites/${slug}/posts`) {
//         //     setSelectedMenuItem('Posts');
//         // } else if (pathname === `/sites/${slug}/forms`) {
//         //     setSelectedMenuItem('Forms');
//         // } else {
//         //     setSelectedMenuItem('');
//         // }
//         console.log('pathname=====>', path)
//     }, [router.pathname, slug]);

//     const handleMenuClick = (menuItem) => {
//         setSelectedMenuItem(menuItem);
//         switch (menuItem) {
//             case 'Sites':
//                 router.push(`/sites`);
//                 break;
//             case 'Pages':
//                 router.push(`/sites/${slug}/pages`);
//                 break;
//             case 'Posts':
//                 router.push(`/sites/${slug}/posts`);
//                 break;
//             case 'Forms':
//                 router.push(`/sites/${slug}/forms`);
//                 break;
//             default:
//                 break;
//         }
//     };
//     console.log('selectedmenu==========>', selectedMenuItem)
//     return (
//         <Row>
//             <Col span={2}>
//                 <Menu mode="vertical" style={{ width: '5vw', height: '100vh' }} selectedKeys={[selectedMenuItem]}>
//                     <Menu.Item>
//                         <Image src={cwlogo} alt="Logo" />
//                     </Menu.Item>
//                     <Menu.Item key="Sites" style={{ height: '2.4rem' }} onClick={() => handleMenuClick('Sites')}>
//                         Sites
//                     </Menu.Item>
//                     {slug && (
//                         <>
//                             <Menu.Item key="Pages" style={{ width: '70px', height: '2.4rem', whiteSpace: 'normal', textOverflow: 'inherit !important' }} onClick={() => handleMenuClick('Pages')}>
//                                 Pages
//                             </Menu.Item>
//                             <Menu.Item key="Posts" style={{ width: '70px', height: '2.4rem', textOverflow: 'inherit !important' }} onClick={() => handleMenuClick('Posts')}>
//                                 Posts
//                             </Menu.Item>
//                             <Menu.Item key="Forms" style={{ width: '70px', height: '2.4rem', textOverflow: 'inherit !important' }} onClick={() => handleMenuClick('Forms')}>
//                                 Forms
//                             </Menu.Item>
//                         </>
//                     )}
//                 </Menu>
//             </Col>
//         </Row>
//     );
// };

// export default SideMenu;







































