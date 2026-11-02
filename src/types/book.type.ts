export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  totalCopies?: number;
  availableCopies?: number;
  rating?: number;
  reviewsCount?: number;
  isbn?: string;
  edition?: string;
  addedBy?: {
    name?: string;
    email?: string;
  };
  createdAt?: string | Date;
}
