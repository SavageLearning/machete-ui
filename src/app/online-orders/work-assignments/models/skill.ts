/**
 * Created by jcii on 5/31/17.
 */
export class skill {
  id: number;
  label: string;
  description: string;
  level: number;
  wage: number;
  fixedJob: boolean; // Used for Casa's Chambitas
  program: number; // the typeOfWorkID field in Machete
  specialty: boolean;
  letterCode: string;
  minimumCost: number; // not used, but exists in skill model
}
