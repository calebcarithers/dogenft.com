import {AirtableProjectStatus} from "../services/Airtable";

export interface AirtableSubmissionProject {
  projectName: any;
  cost: any;
  idea: any;
  status: AirtableProjectStatus;
  description: any;
}