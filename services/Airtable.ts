import Airtable from "airtable";
import {AirtableSubmissionProject} from "../interfaces";

export enum AirtableProjectStatus {
  Funded = "FUNDED",
  Funding = "FUNDING"
}

class _Airtable {
  private airtable: Airtable
  private submissionsBase: Airtable.Base

  constructor() {
    this.airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
    this.submissionsBase = this.airtable.base(process.env.AIRTABLE_BASE_ID as string)
    console.log(this.submissionsBase('SUBMISSIONS'))
  }

  async getProjects(status?: AirtableProjectStatus) {
    const toRet: AirtableSubmissionProject[] = []
    await this.submissionsBase(process.env.AIRTABLE_SUBMISSIONS_BASE_ID as string).select({
      maxRecords: 100,
      view: "Kanban: Submissions",
      filterByFormula: status ? `IF({STATUS} = '${status}', TRUE(), FALSE())` : `IF(OR({STATUS} = '${AirtableProjectStatus.Funded}', {STATUS} = '${AirtableProjectStatus.Funding}'), TRUE(), FALSE())`
    }).eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          const projectName = record.get("Project Name")
          const cost = record.get("How much money do you need to create this idea?")
          const idea = record.get("What's your idea?")
          const isVisible = record.get("Website Visible")
          const status = record.get("Status")
          if (isVisible) {
            toRet.push({
              projectName,
              cost,
              idea,
              status
            })
          }
        })
      fetchNextPage()
    })
    return toRet
  }
}

const airtable = new _Airtable()
export default airtable
