export interface DocumentDto {
  id: string;
  name: string;
  size: number;
  type: string;
  categories: string[];
  deleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
}
