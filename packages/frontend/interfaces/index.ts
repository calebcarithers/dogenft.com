import {AirtableProjectStatus} from "../services/airtable";

export interface AirtableSubmissionProject {
  projectName: any;
  cost: any;
  status: AirtableProjectStatus;
  description: any;
  id: string;
  imageUrl?: string;
  link?: string;
  shortDescription?: string
}