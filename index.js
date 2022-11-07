import Book from './modules/model/book.js';
import View from './modules/view.js';

const booksTable = document.querySelector('#books-table');

const buttonAdd = document.querySelector('#addbutton');

buttonAdd.addEventListener('click', () => {
  const fields = document.querySelectorAll('input');
  const Title = fields[1].value;
  const Author = fields[2].value;
  // Add to local storage
  const book = new Book(null, Title, Author);
  const savedBook = book.add();
  View.addBookToUI(savedBook);
  View.clearForm();
});

const listSection = document.querySelector('#book-list');
const contactSection = document.querySelector('#contact-info');
const addBookSection = document.querySelector('#book-add');
const sectionList = [listSection, contactSection, addBookSection];
const classList = ['show', 'hidden'];

const navbar = document.querySelector('.nav-bar');
navbar.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'new-add':
      View.resetSection(sectionList, classList);

      View.displaySection(addBookSection, sectionList);
      break;
    case 'contact':
      View.resetSection(sectionList, classList);
      View.displaySection(contactSection, sectionList);
      break;
    case 'list':
      View.resetSection(sectionList, classList);

      View.displaySection(listSection, sectionList);
      break;
    default:
      break;
  }
});

View.displayContact();

View.displayDate();

// Display Books on page load
if (Book.count() > 0) {
  document.addEventListener(
    'DOMContentLoaded',
    View.buildBookSection(booksTable, Book.getAll()),
  );
}
