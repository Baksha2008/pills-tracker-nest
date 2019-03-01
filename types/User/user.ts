export interface User {
  email: string;
  password: string;
  name: string;
  surname?: string;
  remember?: boolean;
  expiresIn?: number;
  accessToken?: string;
  _doc?: IDoc;
  isNew: boolean;
}

interface IDoc {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}
