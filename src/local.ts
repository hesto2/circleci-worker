require('dotenv').config();
import { handler } from './index';
const testEvent = {
  source: 'aws.events',
  Records: [
    {
      Sns: {
        MessageAttributes: {
          receiver: { Value: 'circleci-worker' },
          action: { Value: 'manage_approval' },
          value: { Value: 'approve' },
        },
      },
    },
  ],
};

(handler as any)(testEvent);
