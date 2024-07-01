// import axios from 'axios';
// import { NextRequest, NextResponse } from 'next/server';


// export async function GET(req: NextRequest, res: NextResponse) {

//     const url = req.nextUrl;
//     const pageId = url.searchParams.get('pageId');
//     console.log("pageId============>", PageId)
//     const finaldata = {
//         database: 'cw_sites',
//         collection: 'pages',
//         dataSource: 'Cluster0',
//         filter: {
//             pageId: pageId
//         }
//     };

//     try {
//         const axiosResponse = await axios.post('https://data.mongodb-api.com/app/data-iyhny/endpoint/data/v1/action/find', finaldata, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Request-Headers': '*',
//                 'api-key': 'GdHmRMzVn1Uvpw82gclo7QUpZLq60cmsJraAoWOn8wg07aLrUnlw7Y9WZb45oPiq',
//             },
//         });
//         console.log('axiosResponse', axiosResponse);
//         return NextResponse.json(axiosResponse.data);
//     } catch (error) {
//         console.log('catch error', error);
//         return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
//     }
// }


import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl;
    const pageId = url.searchParams.get('pageId');
    console.log("pageId============>", pageId); // Corrected variable name to 'pageId'
    const finaldata = {
        database: 'cw_sites',
        collection: 'pages',
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
        console.log('axiosResponse', axiosResponse);
        return NextResponse.json(axiosResponse.data);
    } catch (error: any) {
        console.log('catch error', error);
        return NextResponse.json({ error: 'Failed to submit data: ' + error.message }, { status: 500 });
    }
}
