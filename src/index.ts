import { Context, SNSEvent, SNSMessageAttributes } from 'aws-lambda';
import { Actions, SNSValue } from './types';
import axios from 'axios';
import manageApproval from './manageApproval';

const notificationUrl = process.env.NOTIFICATION_URL;

export const handler = async (event: SNSEvent, _context: Context) => {
  try {
    const messageAttributes: SNSMessageAttributes = event.Records[0].Sns
      .MessageAttributes as any;
    const value: SNSValue = JSON.parse(messageAttributes.action.Value);
    if (messageAttributes.action.Value === Actions.MANAGE_APPROVAL) {
      await manageApproval(value);
    }
  } catch (err) {
    await axios.post(notificationUrl, {
      channel: 'lambda-errors',
      message: `CircleCI Worker failed: ${err?.data || err}`,
    });
  }
};
