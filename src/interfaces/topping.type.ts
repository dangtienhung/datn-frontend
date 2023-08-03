export interface ITopping {
  _id: string;
  name: string;
  slug: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface IToppingResList {
  message: string;
  data: ITopping[];
}
