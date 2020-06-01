import { ITagMaster } from 'app/shared/model/tag-master.model';
import { ITemplate } from 'app/shared/model/template.model';

export interface IPropertyConfigModbus {
  id?: number;
  uom?: string;
  controlledTag?: boolean;
  register?: number;
  slaveId?: number;
  count?: number;
  mask?: string;
  pollInterval?: number;
  tag?: ITagMaster;
  templateId?: ITemplate;
  propertiesModbus?: ITemplate;
}

export class PropertyConfigModbus implements IPropertyConfigModbus {
  constructor(
    public id?: number,
    public uom?: string,
    public controlledTag?: boolean,
    public register?: number,
    public slaveId?: number,
    public count?: number,
    public mask?: string,
    public pollInterval?: number,
    public tag?: ITagMaster,
    public templateId?: ITemplate,
    public propertiesModbus?: ITemplate
  ) {
    this.controlledTag = this.controlledTag || false;
  }
}
