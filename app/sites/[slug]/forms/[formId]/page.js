


'use client';
import React, { useEffect, useState } from "react";
import { Input, Button, message, Form, Select, Spin, Breadcrumb } from "antd";
import { useParams, useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { CloseOutlined } from '@ant-design/icons';
import Link from "next/link";

const { Option } = Select;

const PageEditor = () => {
    const { slug, formId } = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slug1, setSlug1] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [mongoId, setMongoId] = useState('');
    const [fields, setFields] = useState([]);
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (formId !== "Id") {
            fetchPageDetails(formId);
        }
    }, [slug, formId]);

    const fetchPageDetails = async (formid) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/getformdetails?pageId=${formid}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const pageData = response.data.documents[0];


            setTitle(pageData.title);
            setDescription(pageData.description);

            setFields(pageData.formjson);
            setSlug1(pageData.slug1);
            setMongoId(pageData._id);
        } catch (error) {
            console.error('Failed to fetch page details:', error);
        } finally {
            setLoading(false);
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

    const handleFieldNameChange = (e) => {
        setFieldName(e.target.value);
    };

    const handleFieldTypeChange = (value) => {
        setFieldType(value);
    };

    const addField = () => {
        if (fieldName && fieldType) {
            let newField = { name: fieldName, type: fieldType };
            if (fieldType === 'list') {
                const options = fieldName.split(',').map(option =>
                    ({ value: option.trim(), label: option.trim() }));
                newField.options = options;
            }
            setFields([...fields, newField]);
            setFieldName('');
            setFieldType('');
        } else {
            messageApi.error('Please provide both field name and field type.');
        }
    };

    const deleteField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const site_id = slug;
        const formjson = fields;
        const id = uuidv4();

        const data = {
            title,
            description,
            id,
            site_id,
            formjson,
        };



        try {
            const response = await axios.post('/api/createform', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                messageApi.success('Form created successfully!');


                setTitle('');
                setDescription('');
                setSlug1('');
                setFields([]);

                router.push(`/sites/${slug}/forms`);
            }
        } catch (error) {
            console.error('Error creating form:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updatePage = async () => {

        setLoading(true);

        const id = formId;
        const data = {
            title,
            description,
            // slug1,
            id,
            site_id: slug,
            _id: mongoId,
            formjson: fields,
        };



        try {
            const response = await axios.post(`/api/updateform?pageId=${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });



            if (response.status === 200) {
                messageApi.success('Page updated successfully!');
                router.push(`/sites/${slug}/forms`);
            }
        } catch (error) {
            console.error('Error updating form:', error.message);
        } finally {
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
            <Spin spinning={loading} tip="Loading..." size="large">

                <Breadcrumb className="text-gray-600 text-sm mb-4">
                    {generateBreadcrumbs().map((breadcrumb, index) => (
                        <Breadcrumb.Item key={index}>
                            <Link href={breadcrumb.href} className="hover:underline">{breadcrumb.label}</Link>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <div className="flex space-x-4 p-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mt-2">Title</label>
                        <Input
                            value={title}
                            placeholder="Input Title"
                            className="w-72 h-12"
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mt-2">Description</label>
                        <Input
                            value={description}
                            placeholder="Input Description"
                            className="w-72 h-12"
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </div>
                <div className="flex mt-[2rem]">
                    <div className="flex-1 p-4 bg-cyan-600 rounded-md border-gray-300 ">
                        <h2 className="text-lg font-bold">Generated Fields</h2>
                        <Form layout="vertical">
                            {fields.map((field, index) => (
                                <Form.Item
                                    key={index}
                                    label={field.name}
                                    name={field.name}
                                    rules={[{ required: true, message: `Please input your ${field.name}!` }]}
                                >
                                    <div className="flex items-center space-x-2">
                                        {field.type === 'text' && <Input style={{ width: 400, height: 50 }} />}
                                        {field.type === 'number' && <Input type="number" style={{ width: 400, height: 50 }} />}
                                        {field.type === 'list' &&
                                            field.options?.length > 0 && (
                                                <Select
                                                    style={{ width: 400, height: 50 }}
                                                    placeholder={`Select ${field.name}`}
                                                >
                                                    {/* {field.options.map((option) => (
                                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                                    ))} */}
                                                </Select>
                                            )}
                                        <Button
                                            icon={<CloseOutlined />}
                                            onClick={() => deleteField(index)}
                                        />
                                    </div>
                                </Form.Item>
                            ))}
                        </Form>
                        {formId === "Id" &&
                            <Button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 "
                                onClick={handleSubmit}
                            >
                                Create Form
                            </Button>
                        }
                    </div>
                    <div className="flex flex-col justify-start p-4 w-1/3 bg-cyan-600 border border-gray-300 rounded-md">
                        <label className="block text-lg font-medium text-gray-700 mt-2">Field Name</label>
                        <Input
                            placeholder="Field Name"
                            className="mb-4 h-12 mt-5 w-15"
                            onChange={handleFieldNameChange}
                            value={fieldName}
                        />
                        <label className="block text-lg font-medium text-gray-700">Field Type</label>
                        <Select
                            placeholder="Select Field Type"
                            className="mb-4 h-12 mt-5"
                            onChange={handleFieldTypeChange}
                            value={fieldType}
                        >
                            <Option value="text">Text</Option>
                            <Option value="number">Number</Option>
                            <Option value="list">List</Option>
                        </Select>
                        <Button
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10"
                            onClick={addField}
                        >
                            Add Field
                        </Button>
                        {formId !== "Id" &&
                            <Button
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={updatePage}
                            >
                                Update Form
                            </Button>
                        }
                    </div>
                </div>
            </Spin>
        </>
    );
};

export default PageEditor;
































