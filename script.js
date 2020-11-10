const cover = document.querySelector(".cover");
const modal = document.querySelector(".modal");

const library = document.querySelector(".library");

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = function() {
    return title + " by " + author + ", " + pages + " pages" + ", " + read;
  };
}

// const libraryJS = [
//   new Book("Harry Potter and the Philosopher's Stone", "J.K Rowling", 223, true),
//   new Book("Ulysses", "James Joyce", 730, false),
//   new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true),
//   new Book("Moby Dick", "Herman Melville", 927, false)
// ];

const renderBook = (item, idx) => {
  let divBook = document.createElement("div");
  let tooltip = document.createElement("div");
  let initial = document.createElement("h2");

  let abbreviation = item.title
    .toUpperCase()
    .split(" ")
    .map(item => {
      return item.slice(0, 1);
    })
    .join("");

  divBook.classList.add("book");
  tooltip.classList.add("tooltip");

  tooltip.textContent = item.title;
  initial.textContent = abbreviation;

  divBook.appendChild(initial);
  divBook.appendChild(tooltip);

  library.appendChild(divBook);

  // Open Modal
  divBook.addEventListener("click", e => {
    while (modal.hasChildNodes()) {
      modal.removeChild(modal.firstChild);
    }

    const close = document.createElement("i");

    close.classList.add("fa", "fa-times", "close");

    close.addEventListener("click", () => {
      modal.classList.remove("modalAnim");
      cover.style.display = "none";
    });

    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("h4");

    bookTitle.classList.add("bookTitle");
    bookAuthor.classList.add("bookAuthor");

    bookTitle.textContent = item.title;
    bookAuthor.textContent = `by ${item.author}`;

    const bookBottom = document.createElement("div");
    const bookPages = document.createElement("h2");
    const bookRead = document.createElement("h2");
    const bookReadIcon = document.createElement("i");

    bookBottom.classList.add("bookBottom");

    bookRead.appendChild(bookReadIcon);
    bookBottom.append(bookPages, bookRead);

    bookPages.textContent = `${item.pages} Pages`;
    item.read
      ? (bookRead.innerHTML = "Read <i class='fa fa-check'></i>")
      : (bookRead.innerHTML = "Not Read <i class='fa fa-times'></i>");

    const bookDisplay = document.createElement("div");
    const updateButton = document.createElement("div");
    const deleteButton = document.createElement("div");
    const updateButtonIcon = document.createElement("i");
    const deleteButtonIcon = document.createElement("i");

    bookDisplay.classList.add("bookDisplay");
    updateButton.classList.add("updateButton");
    deleteButton.classList.add("deleteButton");
    updateButtonIcon.classList.add("fa", "fa-edit");
    deleteButtonIcon.classList.add("fa", "fa-trash");

    updateButton.append(updateButtonIcon);
    deleteButton.append(deleteButtonIcon);
    bookDisplay.append(updateButton, deleteButton);

    updateButton.addEventListener("click", () => {
      addUpdate(false, item, idx);
    });

    deleteButton.addEventListener("click", () => {
      // libraryJS.splice(idx, 1);

      db.collection('books').doc(item.id).delete()

      modal.classList.remove("modalAnim");
      cover.style.display = "none";

      db.collection('books').get().then(() => {
        updateDom();
      })
    });

    modal.append(close, bookTitle, bookAuthor, bookBottom, bookDisplay);

    modal.classList.add("modalAnim");
    cover.style.display = "flex";
  });
};

// Close Modal
window.addEventListener("click", e => {
  if (e.target === cover) {
    modal.classList.remove("modalAnim");
    cover.style.display = "none";
  }
});

const renderButton = () => {
  let divButton = document.createElement("div");
  let addButton = document.createElement("i");

  divButton.classList.add("newBook");
  addButton.classList.add("fa", "fa-4x", "fa-plus-circle", "addBook");

  divButton.appendChild(addButton);

  library.appendChild(divButton);

  //Open Modal
  divButton.addEventListener("click", () => {
    addUpdate(true);
  });
};

const addUpdate = (ans, item, idx) => {
  while (modal.hasChildNodes()) {
    modal.removeChild(modal.firstChild);
  }

  const heading = document.createElement("h1");
  const form = document.createElement("form");
  const close = document.createElement("i");

  const formContainer = document.createElement("div");
  const subContainer1 = document.createElement("div");
  const subContainer2 = document.createElement("div");

  const inputTitle = document.createElement("input");
  const inputAuthor = document.createElement("input");
  const inputPages = document.createElement("input");
  const inputRead = document.createElement("input");

  const labelTitle = document.createElement("label");
  const labelAuthor = document.createElement("label");
  const labelPages = document.createElement("label");
  const labelRead = document.createElement("label");

  const submit = document.createElement("button");

  formContainer.classList.add("formContainer");

  heading.classList.add("heading");

  close.classList.add("fa", "fa-times", "close");

  close.addEventListener("click", () => {
    modal.classList.remove("modalAnim");
    cover.style.display = "none";
  });

  inputTitle.setAttribute("type", "text");
  inputAuthor.setAttribute("type", "text");
  inputPages.setAttribute("type", "number");
  inputPages.setAttribute("min", 0);
  inputRead.setAttribute("type", "checkbox");

  labelTitle.textContent = "Book Title";
  labelAuthor.textContent = "Author";
  labelPages.textContent = "Pages";
  labelRead.textContent = "Book Complete";

  submit.textContent = "Submit";

  if (ans) {
    heading.textContent = "Add New Book";

    submit.addEventListener("click", e => {
      e.preventDefault();

      const errorsDiv = document.createElement("ul");
      errorsDiv.classList.add("errors");

      form.childNodes[2] && form.removeChild(form.childNodes[2]);
      form.appendChild(errorsDiv);
      let errors = [];

      !inputTitle.value.length &&
        errors.push("Book Title field must not be empty");
      !inputAuthor.value.length &&
        errors.push("Author field must not be empty");
      inputPages.value <= 0 &&
        errors.push("Pages field must be greater than 0");

      if (errors.length) {
        errors.forEach(item => {
          const error = document.createElement("li");
          error.textContent = item;
          errorsDiv.appendChild(error);
        });
      } else {
        db.collection('books').add({
          title: inputTitle.value,
          author: inputAuthor.value,
          pages: inputPages.value,
          read: inputRead.checked
        })
        
        // libraryJS.push(
        //   new Book(
        //     inputTitle.value,
        //     inputAuthor.value,
        //     inputPages.value,
        //     inputRead.checked
        //   )
        // );

        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";
        inputRead.checked = false;

        modal.classList.remove("modalAnim");
        cover.style.display = "none";

        updateDom();
      }
    });
  } else {
    heading.textContent = "Update Book";

    inputTitle.value = item.title;
    inputAuthor.value = item.author;
    inputPages.value = item.pages;
    inputRead.checked = item.read;

    submit.addEventListener("click", e => {
      e.preventDefault();

      const errorsDiv = document.createElement("ul");
      errorsDiv.classList.add("errors");

      form.childNodes[2] && form.removeChild(form.childNodes[2]);
      form.appendChild(errorsDiv);
      let errors = [];

      !inputTitle.value.length &&
        errors.push("Book Title field must not be empty");
      !inputAuthor.value.length &&
        errors.push("Author field must not be empty");
      inputPages.value <= 0 &&
        errors.push("Pages field must be greater than 0");

      if (errors.length) {
        errors.forEach(item => {
          const error = document.createElement("li");
          error.textContent = item;
          errorsDiv.appendChild(error);
        });
      } else {
        db.collection('books').doc(item.id).update({
          title: inputTitle.value,
          author: inputAuthor.value,
          pages: inputPages.value,
          read: inputRead.checked
        })

        // libraryJS[idx].title = inputTitle.value;
        // libraryJS[idx].author = inputAuthor.value;
        // libraryJS[idx].pages = inputPages.value;
        // libraryJS[idx].read = inputRead.checked;

        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";
        inputRead.value = "";

        modal.classList.remove("modalAnim");
        cover.style.display = "none";

        updateDom();
      }
    });
  }

  form.append(formContainer, submit);
  formContainer.append(subContainer1, subContainer2);
  subContainer1.append(labelTitle, inputTitle, labelAuthor, inputAuthor);
  subContainer2.append(labelPages, inputPages, labelRead, inputRead);
  modal.append(close, heading, form);

  modal.classList.add("modalAnim");
  cover.style.display = "flex";
};

const updateDom = () => {
  while (library.hasChildNodes()) {
    library.removeChild(library.firstChild);
  }

  const shelf1 = document.createElement("div");
  const shelf2 = document.createElement("div");
  const shelf3 = document.createElement("div");

  shelf1.classList.add("shelf");
  shelf2.classList.add("shelf");
  shelf3.classList.add("shelf");

  library.append(shelf1, shelf2, shelf3);

  db.collection('books').orderBy('title').get().then(snapshot => {
    snapshot.docs.forEach((doc, index) => {
      const bk = doc.data()
      const book = new Book(bk.title, bk.author, bk.pages, bk.read, doc.id)
      renderBook(book, index)
    })
    renderButton();
  })
};

updateDom();
