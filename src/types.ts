export enum Actions {
  MANAGE_APPROVAL = 'manage_approval',
}

interface Attribute<T> {
  Value: T;
}

export enum ApprovalValue {
  APPROVE = 'approve',
  DENY = 'deny',
}

export interface SNSMessageAttributes {
  receiver: Attribute<'circleci-worker'>;
  action: Attribute<Actions>;
  value: string;
}

export interface SNSValue {
  approvalAction: ApprovalValue;
  workflowId: string;
  approvalId?: string;
}
