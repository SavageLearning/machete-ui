/**
 * Created by jcii on 6/2/17.
 */

export class Record {
  idString: string;
  id: number;
  datecreated: Date;
  dateupdated: Date;
  createdby: string;
  updatedby: string;
  idPrefix: string;
}
export class Lookup extends Record {
  category: string;
  text_EN: string;
  text_ES: string;
  selected: boolean;
  subcategory: string;
  level: number;
  wage: number;
  minHour: number;
  fixedJob?: boolean;
  sortorder: number;
  typeOfWorkID: number;
  speciality: boolean;
  ltrCode: string;
  emailTemplate: string;
  skillDescriptionEn: string;
  skillDescriptionEs: string;
  minimumCost?: number;
  key: string;
  active: boolean;
  clientRules: string;

}
