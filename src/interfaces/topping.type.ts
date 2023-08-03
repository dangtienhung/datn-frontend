export interface ITopping {
  _id?: string;
  name: string;
<<<<<<< HEAD
  slug?: string;
  price: number;
  products?: string[];
  createdAt?: string;
  updatedAt?: string;
=======
  slug: string;
  price: string;
  createdAt: string;
  updatedAt: string;
>>>>>>> fbeaca76ec4d83756d42f1987272af5a293e6f5f
}

export interface IToppingResList {
  message: string;
  data: ITopping[];
}
