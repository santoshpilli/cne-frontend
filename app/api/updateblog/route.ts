import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const userData = await req.json();
    console.log('userData', userData);
    let obj = {
        title: userData.title,
        description: userData.description,
        content: userData.content,
        slug1: userData.slug1,
        id: userData.id,
        site_id: userData.site_id,
    }
    const finaldata = {
        database: 'cw_sites',
        collection: 'posts',
        dataSource: 'Cluster0',
        // document: userData,
        // filter: { _id: userData._id }, // Filtering by the document ID
        filter: { _id: { $oid: userData._id } },

        update: { $set: obj }
    };

    console.log('Final data being sent to MongoDB API:', finaldata);

    try {
        const axiosResponse = await axios.post(`${process.env.MONGO_DB_URL}/updateOne`, finaldata, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${process.env.MONGO_DB_APIKEY}`
            }
        });
        console.log('axiosResponse', axiosResponse);
        return NextResponse.json(axiosResponse.data);
    } catch (error) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}