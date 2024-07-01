


import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const finaldata = {
        database: 'cw_sites',
        collection: 'sites',
        dataSource: 'Cluster0',
    };

    try {
        const axiosResponse = await axios.post(`${process.env.MONGO_DB_URL}/find`, finaldata, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${process.env.MONGO_DB_APIKEY}`
            },
            timeout: 5000,
        });
        console.log('axiosResponse', axiosResponse);
        return NextResponse.json(axiosResponse.data);
    } catch (error: any) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}
