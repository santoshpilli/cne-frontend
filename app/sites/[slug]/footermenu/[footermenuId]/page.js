'use client';
import React, { useEffect, useState } from "react";
import { Input, message, Spin, Breadcrumb } from "antd";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from "next/link";

const { Search } = Input;
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const PageEditor = () => {
    const { slug, footermenuId } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const [theme, setTheme] = useState('vs-dark');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug1, setSlug1] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [mongoId, setMongoId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (footermenuId !== "Id") {
            fetchPageDetails(footermenuId);
        }
    }, [slug, footermenuId]);
  

    const fetchPageDetails = async (footermenuId) => {
     
        try {
            const response = await axios.get(`/api/getfootermenudetails?footermenuId=${footermenuId}`, {
                
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const pageData = response.data.documents[0];
            


            setTitle(pageData.title);
            setDescription(pageData.description);
            setContent(pageData.content);
            setSlug1(pageData.slug1);
            setMongoId(pageData._id);
        } catch (error) {
            console.error('Failed to fetch page details:', error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSlugChange = (e) => {
        setSlug1(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = uuidv4();
        const data = { title, description, content, slug1, id, site_id: slug };

        try {
            const response = await axios.post('/api/createfootermenu', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                messageApi.success('Page created successfully!');

                setTitle('');
                setDescription('');
                setContent('');
               

                router.push(`/sites/${slug}/footermenu`);
            }
        } catch (error) {
            console.error('Error creating page:', error.message);
        }
    };

    const updatePage = async () => {


        const id = footermenuId;
        const data = { title, description, content, slug1, id, site_id: slug, _id: mongoId };


        setLoading(true);

        try {
            const response = await axios.post(`/api/updatefootermenu?footermenuId=${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            setLoading(false);

            if (response.status === 200) {
                messageApi.success('Page updated successfully!');
                router.push(`/sites/${slug}/footermenu`);
            }
        } catch (error) {
            console.error('Error updating page:', error.message);
            setLoading(false);
        }
    };

    const generateBreadcrumbs = () => {
        const pathParts = pathname.split('/').filter(part => part);
        const breadcrumbs = [
            {
                href: '/',
                label: 'Home',
            },
            ...pathParts.map((part, index) => {
                const href = `/${pathParts.slice(0, index + 1).join('/')}`;
                return {
                    href,
                    label: part.charAt(0).toUpperCase() + part.slice(1),
                };
            }),
        ];

        return breadcrumbs;
    };

    return (
        <>
            {contextHolder}

            <Spin spinning={loading} tip="Loading..." size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ width: '100%' }}>

                    <Breadcrumb className="text-gray-600 text-sm mb-4">
                        {generateBreadcrumbs().map((breadcrumb, index) => (
                            <Breadcrumb.Item key={index}>
                                <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>

                    <div className="flex space-x-4 p-4">
                        <div>


                            <label className="block text-lg font-medium text-gray-700 mt-2">FooterMenu</label>
                            <Input
                                value={title}
                                placeholder="Input Title"
                                className="w-72 h-12"
                                onChange={handleTitleChange}
                            />
                        </div>
                        {/* <div>
                            <label className="block text-lg font-semibold text-gray-700 mt-2">Slug</label>
                            <Input
                                placeholder="Input Slug"
                                className="w-72 h-12"
                                onChange={handleSlugChange}
                                value={slug1}
                            />
                        </div> */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mt-2">Description</label>
                            <Input
                                placeholder="Input Description"
                                className="w-72 h-12"
                                onChange={handleDescriptionChange}
                                value={description}
                            />
                        </div>
                    </div>
                    <div className="flex h-96 mt-[2rem]">
                        <div className="flex-1">
                            <MonacoEditor
                                height="100%"
                                language="json"
                                value={content}
                                theme={theme}
                                onChange={handleEditorChange}
                            />
                        </div>
                        <div className="flex flex-col justify-start p-4">
                            {footermenuId === "Id" ? (
                                <button
                                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                >
                                    Create FooterMenu
                                </button>
                            ) : (
                                <button
                                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={updatePage}
                                >
                                    Update FooterMenu
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    );
};

export default PageEditor;


































