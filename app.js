/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BooksClass {
  constructor() {
    return [];
  }
}

class DynamicHtml {
  static displayElements(booksCollection) {
    booksCollection.forEach((book, index) => DynamicHtml.addBookToTable(book, index));
  }

  static addBookToTable(book, id) {
    const bookList = document.querySelector('#book-list');
    const bookRecord = document.createElement('tr');
    const titleCell = document.createElement('td');
    // const horline = document.createElement('hr');
    // horline.setAttribute('width', '100vw');
    titleCell.textContent = `"${book.title}" by ${book.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.id = id;
    removeBtn.className = 'removeBtn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = this.removeBook;
    bookRecord.append(titleCell, removeBtn);
    bookList.appendChild(bookRecord);
  }

  static removeBook(e) {
    const id = parseInt(this.id);
    booksCollection.splice(id, 1);
    console.log(booksCollection);
    e.target.parentNode.remove();
    localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
  }
}

const addBtn = document.getElementById('book-form');
let booksCollection = new BooksClass();
if (localStorage.getItem('booksCollection')) {
  booksCollection = JSON.parse(localStorage.getItem('booksCollection'));
}
addBtn.addEventListener('submit', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const book = new AwesomeBook(title, author);
  booksCollection.push(book);
  const id = booksCollection.length - 1;
  DynamicHtml.addBookToTable(book, id);
  localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
});

window.addEventListener('load', () => {
  if (localStorage.getItem('booksCollection')) {
    booksCollection = JSON.parse(localStorage.getItem('booksCollection'));
  }
  DynamicHtml.displayElements(booksCollection);
});
