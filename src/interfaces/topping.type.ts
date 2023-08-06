export interface ITopping {
  _id?: string;
  name: string;
  slug?: string;
  price: number;
  products?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IToppingResList {
  message: string;
  data: ITopping[];
}
