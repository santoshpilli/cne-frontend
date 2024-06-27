'use client';

import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import axios from 'axios';
import 'antd/dist/reset.css';
import { Breadcrumb, Spin, message } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import AuthenticatedLayout from "../component/AuthenticatedLayout";
const Pages = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [site, setSite] = useState({ documents: [] });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (id) => {
        router.push(`/sites/${id}/pages`);
    };

    const handleOpenPopup = () => setOpenPopup(true);
    const handleClosePopup = () => setOpenPopup(false);

    const handleAddPost = async (event) => {
        event.preventDefault();
        setLoading(true);
        const name = event.target.name.value;
        const description = event.target.description.value;
        const url = event.target.url.value;
        const id = uuidv4();

        const newSite = { id, name, description, url };


        handleClosePopup();
        try {
            const response = await axios.post('api/createsite', newSite, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                handleClosePopup();
                fetchAllSites();
                messageApi.success('Site created successfully!');
            }

        } catch (error) {
            console.error("Failed to create site:", error);
            messageApi.error('Failed to create site.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllSites = async () => {
        setLoading(true);
        try {
            const response = await axios.get('api/getallsites', {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Request-Headers': '*',
                },
                timeout: 5000,
            });
            setSite(response.data);

        } catch (error) {
            console.error("Failed to fetch sites:", error);
            messageApi.error('Failed to fetch sites.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSites();
    }, []);


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
            <AuthenticatedLayout>
                {contextHolder}
                <Spin spinning={loading} tip="Loading..." size="large">
                    <div className="flex flex-col items-center justify-between p-[3rem]">

                        <Breadcrumb className="mb-4 text-sm">
                            {generateBreadcrumbs().map((breadcrumb, index) => (
                                <Breadcrumb.Item key={index}>
                                    <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
                                </Breadcrumb.Item>
                            ))}
                        </Breadcrumb>

                        <h1 className="text-3xl font-bold mb-4">Sites</h1>

                        <div className="flex flex-col items-center justify-center">
                            <button
                                onClick={handleOpenPopup}
                                className="flex h-8 w-36 items-center justify-center bg-[#89B710] text-[#fff] rounded-lg"
                            >
                                Create New Site
                            </button>

                            {openPopup && (
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-md z-50 flex items-center justify-center">
                                    <div className="bg-white rounded-md p-4 shadow-md">
                                        <h2 className="text-xl font-semibold mb-4">Create New Site</h2>

                                        <form onSubmit={handleAddPost}>
                                            <div className="mb-2">
                                                <label htmlFor="name" className="text-sm font-medium">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="border border-gray-300 rounded-md w-full p-2"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="description" className="text-sm font-medium">
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="border border-gray-300 rounded-md w-full p-2 h-24"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="url" className="text-sm font-medium">
                                                    URL
                                                </label>
                                                <input
                                                    type="url"
                                                    id="url"
                                                    name="url"
                                                    className="border border-gray-300 rounded-md w-full p-2"
                                                />
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={handleClosePopup}
                                                    className="mr-2 text-gray-500 hover:text-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-[#89B710] text-[#fff] rounded-lg"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-2 ml-15">
                            {site.documents.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105"
                                    onClick={() => handleClick(item.id)}
                                >
                                    <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                                    <p className="text-gray-600 mb-2">{item.description}</p>
                                    <p className="text-blue-500 overflow-hidden text-ellipsis whitespace-nowrap">{item.url}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Spin>
            </AuthenticatedLayout>
        </>
    );
};

export default Pages;

















