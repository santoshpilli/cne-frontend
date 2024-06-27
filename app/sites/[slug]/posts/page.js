


'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from 'next/navigation';
import { Spin, Breadcrumb } from 'antd';
import Link from "next/link";

const Pages = () => {
    const [pages, setPages] = useState([]);
    const router = useRouter();
    const { slug } = useParams();
    const [loading, setLoading] = useState(false)
    const pathname = usePathname();

    const fetchAllPages = async () => {
        try {
            const response = await axios.get(`/api/getallblogs?site_id=${slug}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setPages(response.data.documents);
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch pages:", error);
            setLoading(false)

        }
    };

    useEffect(() => {
        setLoading(true)
        fetchAllPages();
    }, []);



    const handleCreatePost = () => {
        router.push(`/sites/${slug}/posts/Id`);
    };


    const handlePageClick = (pageId) => {


        router.push(`/sites/${slug}/posts/${pageId}`);
    };

    const handlePostClick = (postId) => {


        router.push(`/sites/${slug}/posts/${postId}`);
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
        <div>

            <Breadcrumb className="text-gray-600 text-sm mb-4">
                {generateBreadcrumbs().map((breadcrumb, index) => (
                    <Breadcrumb.Item key={index}>
                        <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <div className="flex justify-end mt-4 mr-4">
                <button onClick={handleCreatePost} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Post
                </button>
            </div>
            <Spin spinning={loading} size="large">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 mx-2 ml-15">
                    {pages.map(page => (
                        <div
                            key={page._id}
                            className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => handlePostClick(page.id)}
                        >
                            <h2 className="text-xl font-bold">{page.title}</h2>
                            <p className="text-gray-600">{page.description}</p>
                            <p>{page.content}</p>
                        </div>
                    ))}
                </div>
            </Spin>
        </div>
    );
};

export default Pages;