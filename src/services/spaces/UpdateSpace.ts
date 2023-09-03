import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";



export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
    if (!(event.queryStringParameters && ('id' in event.queryStringParameters) && event.body)) {
        return {
            statusCode: 400,
            body: JSON.stringify('Please provide right args!!')
        }
    }

    const parsedBody = JSON.parse(event.body);
    const spaceId = event.queryStringParameters['id'];
    const requestBodyKey = Object.keys(parsedBody)[0];
    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await ddbClient.send(new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
            'id': { S: spaceId }
        },
        UpdateExpression: 'set #key = :value',
        ExpressionAttributeNames: {
            '#key': requestBodyKey
        },
        ExpressionAttributeValues: {
            ':value': {
                S: requestBodyValue
            }
        },
        ReturnValues: 'UPDATED_NEW'
    }));

    return {
        statusCode: 204,
        body: JSON.stringify(updateResult.Attributes)
    }
}