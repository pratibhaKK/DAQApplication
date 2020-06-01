import { IDevice } from 'app/shared/model/device.model';
import { IPropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';
import { IProperty } from 'app/shared/model/property.model';

export interface ITemplate {
  id?: number;
  templateName?: string;
  description?: string;
  protocolSupported?: string;
  device?: IDevice;
  propertyConfigModbuses?: IPropertyConfigModbus[];
  properties?: IProperty[];
}

export class Template implements ITemplate {
  constructor(
    public id?: number,
    public templateName?: string,
    public description?: string,
    public protocolSupported?: string,
    public device?: IDevice,
    public propertyConfigModbuses?: IPropertyConfigModbus[],
    public properties?: IProperty[]
  ) {}
}
