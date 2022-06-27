class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class DynamicHtml {
  displayElements() {
    const addedBooks = [];
    addedBooks.forEach((book) => DynamicHtml.addBookToTable(book));
  }

  addBookToTable(book) {
    const bookList = document.querySelector("#book-list");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    `;

    bookList.appendChild(newRow);
  }
}
