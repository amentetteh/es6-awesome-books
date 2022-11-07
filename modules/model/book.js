class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static getAll() {
    const books = localStorage.getItem('books');
    return (books === null) ? [] : JSON.parse(books);
  }

  add() {
    const books = Book.getAll();
    this.id = Book.count() + 1;
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return this;
  }

  remove() {
    const books = Book.getAll();
    books.forEach((book, index) => {
      if (parseInt(book.id, 10) === parseInt(this.id, 10)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static count() {
    return this.getAll().length;
  }
}
export default Book;