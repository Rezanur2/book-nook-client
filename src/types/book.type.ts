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
  userName?: string;
  userEmail?: string;
  creatorName?: string;
  creatorEmail?: string;
  creatorImage?: string;
  createdAt?: string | Date;
}
