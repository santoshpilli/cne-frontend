import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl;
    const pageId = url.searchParams.get('headermenuId');
    console.log("pageID", pageId); // Corrected variable name to 'pageId'
    const finaldata = {
        database: 'cw_sites',
        collection: 'header_menu',
        dataSource: 'Cluster0',
        filter: {
            id: pageId
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
        console.log('axiosResponse', axiosResponse.data);
        return NextResponse.json(axiosResponse.data);
    } catch (error: any) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}