import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const userData = await req.json();
    console.log('userData', userData);

    const finaldata = {
        database: 'cw_sites',
        collection: 'header_menu',
        dataSource: 'Cluster0',
        document: userData
    };

    try {
        const axiosResponse = await axios.post(`${process.env.MONGO_DB_URL}/insertOne`, finaldata, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${process.env.MONGO_DB_APIKEY}`
            }
        });
        console.log('axiosResponse', axiosResponse);
        return NextResponse.json(axiosResponse.data);
    } catch (error: any) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}