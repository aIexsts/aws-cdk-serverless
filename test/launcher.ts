import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "eu-west-2";
process.env.TABLE_NAME = 'SpaceTable-064b471303dc'

handler({
    httpMethod: 'POST',
    // queryStringParameters: {
    //     id: '02b29e35-857e-422f-a707-3db17a2b396e'
    // },
    body: JSON.stringify({
        name: 'kek',
        location: 'Narva topchik'
    })
} as any, {} as any).then(result =>{
    console.log(result)
});