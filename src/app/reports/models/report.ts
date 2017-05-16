import { Column } from './column';
/**
 * Created by jcarter on 3/9/17.
 */
export class Report
{
  name: string;
  commonName: string;
  title: string;
  description: string;
  sqlquery: string;
  category: string;
  subcategory: string;
  idString: string;
  id: number;
  data: Object;
  datecreated: Date;
  dateupdated: Date;
  createdby: string;
  updatedby: string;
  idPrefix: string;
  columns: Column[];
}
