



'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useParams, usePathname } from 'next/navigation';
import { Breadcrumb } from "antd";
import Link from "next/link";

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;
    const pathname = usePathname();


    const handlePageClick = () => {
        router.push(`/sites/${slug}/pages`);
    };

    const handleBlogClick = () => {
        router.push(`/sites/${slug}/blogs`);
    };

    const handleFormClick = () => {
        router.push(`/sites/${slug}/forms`);
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




        <div className="flex justify-center items-center mt-[2rem] relative">
            <Breadcrumb className="text-gray-600 text-sm mb-4">
                {generateBreadcrumbs().map((breadcrumb, index) => (
                    <Breadcrumb.Item key={index}>
                        <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>

        </div>



    );
}

export default Page;










