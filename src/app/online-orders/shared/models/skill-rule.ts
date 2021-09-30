import { Record } from "./record";

export class SkillRule extends Record<SkillRule> {
  key: string;
  subcategory: string;
  level: number;
  wage: number;
  minHour: number;
  maxHour = 8;
  minimumCost?: number; // never used?
  fixedJob?: boolean;
  speciality: boolean;
  ltrCode: string;
  descriptionEn: string;
  descriptionEs: string;
  active: boolean;
}
