/**
 * Created by jcii on 5/23/17.
 */
export class ExportColumn {
  name: string;
  is_nullable: boolean;
  system_type_name: string;

  constructor(options: {
    name?: string,
    is_nullable?: boolean,
    system_type_name?: string
  } = {}) {
    this.name = options.name;
    this.is_nullable = options.is_nullable;
    this.system_type_name = options.system_type_name;
  }
}
