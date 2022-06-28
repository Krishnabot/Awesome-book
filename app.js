/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class DynamicHtml {
  static displayElements(booksCollection) {
    booksCollection.forEach((book, index) => DynamicHtml.addBookToTable(book, index));
  }

  static addBookToTable(book, id) {
    const bookList = document.querySelector('#book-list');
    const bookRecord = document.createElement('tbody');

    const titleCell = document.createElement('tr');
    const authCell = document.createElement('tr');
    const horline = document.createElement('hr');
    horline.setAttribute('width', '100vw');
    titleCell.textContent = book.title;
    authCell.textContent = book.author;
    const removeBtn = document.createElement('button');
    removeBtn.id = id;
    removeBtn.className = 'removeBtn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = removeBook;
    bookRecord.append(titleCell, authCell, removeBtn, horline);
    bookList.appendChild(bookRecord);
  }
}

function removeBook(event) {
  const id = parseInt(event.target.id, 10);
  booksCollection.splice(id,1);
  localStorage.setItem('booksCollection', JSON.stringify(booksCollection));
  event.target.parentNode.remove();
}

const addBtn = document.getElementById('book-form');
let booksCollection = [];
if (localStorage.getItem('booksCollection')) booksCollection = JSON.parse(localStorage.getItem('booksCollection'));
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
  if (localStorage.getItem('booksCollection')) booksCollection = JSON.parse(localStorage.getItem('booksCollection'));
  DynamicHtml.displayElements(booksCollection);
});
