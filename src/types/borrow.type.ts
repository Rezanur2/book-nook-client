export interface IBorrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  userName?: string;
  borrowDate: string;
  returnDate: string;
}
