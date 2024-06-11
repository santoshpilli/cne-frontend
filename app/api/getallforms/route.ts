import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    // const siteId = 
    const url = req.nextUrl;
    const siteId = url.searchParams.get('site_id');
    console.log("siteId============>", siteId)
    const finaldata = {
        database: 'cw_sites',
        collection: 'forms',
        dataSource: 'Cluster0',
        filter: {
            site_id: siteId
        }
    };

    try {
        const axiosResponse = await axios.post(`${process.env.MONGO_DB_URL}/find`, finaldata, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': `${process.env.MONGO_DB_APIKEY}`
            },
        });
        console.log('axiosResponse', axiosResponse);
        return NextResponse.json(axiosResponse.data);
    } catch (error) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}