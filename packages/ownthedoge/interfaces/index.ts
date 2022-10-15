export enum AirtableProjectStatus {
  Funded = "FUNDED",
  Funding = "FUNDING"
}

export interface AirtableSubmissionProject {
  projectName: any;
  cost?: any;
  status: AirtableProjectStatus;
  description: any;
  id: string;
  imageUrl: string;
  link?: string;
  shortDescription?: string
}