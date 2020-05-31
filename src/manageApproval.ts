import { ApprovalValue, SNSValue } from './types';
import axios from 'axios';
const notificationUrl = process.env.NOTIFICATION_URL;

const baseUrl = 'https://circleci.com/api/v2/';
const token = process.env.CIRCLE_CI_API_TOKEN;
const getUrl = (endpoint: string) =>
  `${baseUrl}${endpoint}?circle-token:${token}`;

const manageApproval = async ({
  approvalAction,
  workflowId,
  approvalId,
}: SNSValue) => {
  if (approvalAction === ApprovalValue.APPROVE) {
    await axios.post(getUrl(`/workflow/${workflowId}/approve/${approvalId}`));
  } else {
    await axios.post(getUrl(`/workflow/${workflowId}/cancel`));
  }
  await axios.post(notificationUrl, {
    channel: 'iot-circleci',
    message: `Job ${workflowId} ${
      approvalAction === ApprovalValue.APPROVE ? 'Approved' : 'Cancelled'
    }`,
  });
};

export default manageApproval;
