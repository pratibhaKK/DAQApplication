export interface ITagMaster {
  id?: number;
  tagId?: string;
  tagName?: string;
  description?: string;
}

export class TagMaster implements ITagMaster {
  constructor(public id?: number, public tagId?: string, public tagName?: string, public description?: string) {}
}
