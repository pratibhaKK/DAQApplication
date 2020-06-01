export interface IDevice {
  id?: number;
  deviceName?: string;
  deviceType?: string;
  model?: number;
  description?: string;
}

export class Device implements IDevice {
  constructor(
    public id?: number,
    public deviceName?: string,
    public deviceType?: string,
    public model?: number,
    public description?: string
  ) {}
}
