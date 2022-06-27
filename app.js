class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class DynamicHtml {
  static displayElements(booksCollection) {
    booksCollection.forEach((book, index) =>
      DynamicHtml.addBookToTable(book, index)
    );
  }
  static addBookToTable(book, id) {
    const bookList = document.querySelector("#book-list");
    const bookRecord = document.createElement("tbody");

    const titleCell = document.createElement("tr");
    const authCell = document.createElement("tr");
    const horline = document.createElement("hr");
    horline.setAttribute("width", "100vw");
    titleCell.textContent = book.title;
    authCell.textContent = book.author;
    const removeBtn = document.createElement("button");
    removeBtn.id = id;
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = removeBook;
    // newRow.innerHTML = `
    // <td>${book.title}</td>
    // <td>${book.author}</td>
    // `;
    bookRecord.append(titleCell, authCell, removeBtn, horline);
    bookList.appendChild(bookRecord);
  }
}

const addBtn = document.getElementById("add-book");
let booksCollection = [];
if (localStorage.getItem("booksCollection"))
  booksCollection = JSON.parse(localStorage.getItem("booksCollection"));
addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const book = new AwesomeBook(title, author);
  booksCollection.push(book);
  let id = booksCollection.length - 1;
  DynamicHtml.addBookToTable(book, id);
  localStorage.setItem("booksCollection", JSON.stringify(booksCollection));
});

window.addEventListener("load", () => {
  if (localStorage.getItem("booksCollection"))
    booksCollection = JSON.parse(localStorage.getItem("booksCollection"));
  DynamicHtml.displayElements(booksCollection);
});

const rmBtn = document.querySelector(".removeBtn");
function removeBook(event) {
  let id = parseInt(event.target.id);
  booksCollection.pop(id);
  localStorage.setItem("booksCollection", JSON.stringify(booksCollection));
  const bookList = document.querySelector("#book-list");
  event.target.parentNode.remove();
  window.reload;
}
