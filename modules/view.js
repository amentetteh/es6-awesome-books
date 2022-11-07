import Book from "./model/book.js";
import Contact from "./model/contact.js";
import { DateTime } from "../luxon.js";


class View {
  static createTag = (tagName, textContent = null, className = null) => {
    const tag = document.createElement(tagName);
    tag.textContent = textContent;
    tag.className = className;
    return tag;
  };

  static createBookRow = (book) => {
    const bookRow = View.createTag("tr", null, "rowTR");
    const titleTD = View.createTag("td", null, "titleTD");
    const authorTD = View.createTag("td", null, "authorTD");
    const idTD = View.createTag("td", null, "idTD hidden");
    const buttonTD = View.createTag("td", null, "buttonTD buttonRemove");
    const buttonRemove = View.createTag("button", "Remove", "buttonRemove");
    buttonTD.appendChild(buttonRemove);

    const rowItems = [idTD, titleTD, authorTD, buttonTD];

    for (let j = 0; j < rowItems.length; j += 1) {
      bookRow.appendChild(rowItems[j]);
    }

    idTD.textContent = book.id;
    titleTD.textContent = `“${book.title}”`;
    authorTD.textContent = book.author;

    buttonRemove.addEventListener("click", (event) => {
      const { target } = event;
      const bookNode = target.parentNode.parentNode.getElementsByTagName("td");
      const ID = bookNode[0].innerHTML;
      const Title = bookNode[1].innerHTML;
      const Author = bookNode[2].innerHTML;
      const book = new Book(ID, Title, Author);
      // Remove from data
      book.remove();
      // Remove from UI
      View.removeBookFromUI(target);
    });
    return bookRow;
  };

  static buildBookSection = (table, bookList) => {
    if (bookList && bookList.length > 0) {
      for (let i = 0; i < bookList.length; i += 1) {
        table.appendChild(View.createBookRow(bookList[i]));
      }
    }
  };

  static resetSection = (sectionArray, classArray) => {
    for (let i = 0; i < sectionArray.length; i += 1) {
      for (let j = 0; j < classArray.length; j += 1) {
        sectionArray[i].classList.remove(classArray[j]);
      }
    }
  };

  static displaySection = (section, sectionArray) => {
    if (!section.classList.contains("show")) {
      section.classList.toggle("show");
    }
    for (let i = 0; i < sectionArray.length; i += 1) {
      if (sectionArray[i] !== section) {
        if (!sectionArray[i].classList.contains("hidden")) {
          sectionArray[i].classList.toggle("hidden");
        }
      }
    }
  };

  static removeBookFromUI = (item) => {
    if (item.classList.contains("buttonRemove")) {
      item.parentElement.parentElement.remove();
    }
  };

  static addBookToUI = (table, book) => {
    table.appendChild(View.createBookRow(book));
  };

  static clearForm = () => {
    document.querySelector("#bookID").value = "";
    document.querySelector("#booktitle").value = "";
    document.querySelector("#bookauthor").value = "";
  };

  static displayContact = () => {
    const contactUl = View.createTag("ul", null, "contact-ul");
    const contact = new Contact();
    const contactlist = Object.values(contact);
    for (let i = 0; i < contactlist.length; i += 1) {
      const contactLi = View.createTag("li", null, "contact-li");
      contactLi.textContent = contactlist[i];
      contactUl.appendChild(contactLi);
    }
    const contactList = document.querySelector(".contact-list");
    contactList.appendChild(contactUl);
  };

  static displayDate = () => {
    const datePlaceholder = document.querySelector("#datetime");

    // eslint-disable-next-line no-undef
    datePlaceholder.textContent = DateTime.local().toLocaleString(
      DateTime.DATETIME_FULL
    );
  };
}

export default View;
