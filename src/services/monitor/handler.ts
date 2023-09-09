import { SNSEvent } from "aws-lambda";

const webHookUrl = 'https://hooks.slack.com/services/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';

export async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Huston, we have a problem: ${record.Sns.Message}`
            })
        })
    }
}