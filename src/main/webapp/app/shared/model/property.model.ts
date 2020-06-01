import { ITagMaster } from 'app/shared/model/tag-master.model';
import { ITemplate } from 'app/shared/model/template.model';

export interface IProperty {
  id?: number;
  uom?: string;
  controlledTag?: boolean;
  pollInterval?: number;
  tagId?: ITagMaster;
  templateId?: ITemplate;
  properties?: ITemplate;
}

export class Property implements IProperty {
  constructor(
    public id?: number,
    public uom?: string,
    public controlledTag?: boolean,
    public pollInterval?: number,
    public tagId?: ITagMaster,
    public templateId?: ITemplate,
    public properties?: ITemplate
  ) {
    this.controlledTag = this.controlledTag || false;
  }
}
