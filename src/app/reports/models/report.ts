import { ReportDefinitionVM } from "machete-client";
import { Column } from "./column";
import { SearchInputs } from "./search-inputs";
/**
 * Created by jcarter on 3/9/17.
 */
export class Report implements ReportDefinitionVM {
  constructor(init?: Partial<Report>) {
    Object.assign(this, init);
  }
  name: string;
  commonName: string;
  title: string;
  description: string;
  sqlquery: string;
  category: string;
  subcategory: string;
  idString: string;
  id: number;
  datecreated: string;
  dateupdated: string;
  createdby: string;
  updatedby: string;
  idPrefix: string;
  columns: Column[];
  inputs: SearchInputs;
}
