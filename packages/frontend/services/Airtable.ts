import Airtable from "airtable";
import {AirtableSubmissionProject} from "../../interfaces";

export enum AirtableProjectStatus {
  Funded = "FUNDED",
  Funding = "FUNDING"
}

class _Airtable {
  private airtable: Airtable
  private submissionsBase: Airtable.Base
  private submissionsBaseID: string

  constructor() {
    this.airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
    this.submissionsBase = this.airtable.base(process.env.AIRTABLE_BASE_ID as string)
    this.submissionsBaseID = process.env.AIRTABLE_SUBMISSIONS_BASE_ID as string
  }

  private static getProjectFields(record: any): AirtableSubmissionProject {
    const projectName = record.get("Project Name")
    const cost = record.get("How much money do you need to create this idea?")
    const status = record.get("Status") as AirtableProjectStatus
    const description = record.get("Website Description")
    const image = record.get("Website Feature Image")
    const link = record.get("Website Link")
    const shortDescription = record.get("Website Short Description")
    const id = record.id
    return {
      projectName,
      cost,
      status,
      description,
      id,
      link,
      shortDescription,
      imageUrl: image ? image[0].url : undefined
    }
  }

  async getProjects(status?: AirtableProjectStatus) {
    const results: AirtableSubmissionProject[] = []
    await this.submissionsBase(this.submissionsBaseID).select({
      maxRecords: 100,
      view: "Kanban: Submissions",
      filterByFormula: status ? `IF({STATUS} = '${status}', TRUE(), FALSE())` : `IF(OR({STATUS} = '${AirtableProjectStatus.Funded}', {STATUS} = '${AirtableProjectStatus.Funding}'), TRUE(), FALSE())`
    }).eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          const isVisible = record.get("Website Visible")
          const image = record.get("Website Feature Image")
          if (isVisible) {
            results.push(_Airtable.getProjectFields(record))
          }
        })
      fetchNextPage()
    })
    return results
  }

  async getProject(id: string): Promise<AirtableSubmissionProject> {
    return new Promise((resolve, reject) => {
      this.submissionsBase(this.submissionsBaseID).find(id, (err, record) => {
        if (err) {
          reject("Could not find project")
        } else {
          resolve(_Airtable.getProjectFields(record))
        }
      })
    })
  }
}

const airtable = new _Airtable()
export default airtable
