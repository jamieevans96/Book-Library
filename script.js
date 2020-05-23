let myLibrary = [new Book('Harry Potter', 'JK Rowling', '256', true, 'a'), new Book('Petret', 'Thomas Aloping', '316', false, 'b')];
let c = 1;
let chars = 'abcdef';

// var letter = chars.charAt(Math.floor(Math.random() * chars.length));

function Book(title, author, pages, read, bg) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function() {
  //   return(title + ' by ' + author + ', ' + pages + ' pages' + ', ' + read);
  // }
  this.bg = bg;
}

function addBookToLibrary() {  
  var newTitle = document.getElementById("title").value;
  var newAuthor = document.getElementById("author").value;
  var newPages = document.getElementById("pages").value;
  var newRead = document.getElementById("read").checked;
  var newBg = chars.charAt(Math.floor(Math.random() * chars.length));
  
  const newBook = new Book(newTitle, newAuthor, newPages, newRead, newBg);
  
  myLibrary.push(newBook);
  
  var temp = document.getElementById("library");
  while (temp.hasChildNodes()) {
    temp.removeChild(temp.firstChild);
  }
  
  myLibrary.forEach(render);
}

function render(a, b) {
  var container = document.createElement("div");
  document.getElementById("library").appendChild(container);
  container.classList.add("container");
  container.classList.add(a.bg);
  container.setAttribute("id", "container" + b);
  
  var ttl = document.createElement("div");
  document.getElementById("container" + b).appendChild(ttl);
  ttl.classList.add("text");
  ttl.innerHTML = a.title;
  
  var aut = document.createElement("div");
  document.getElementById("container" + b).appendChild(aut);
  aut.classList.add("text");
  aut.innerHTML = a.author;
  
  var pgs = document.createElement("div");
  document.getElementById("container" + b).appendChild(pgs);
  pgs.classList.add("text");
  pgs.innerHTML = a.pages;
    
  
  var rd = document.createElement("div");
  document.getElementById("container" + b).appendChild(rd);
  rd.classList.add("text");
  rd.setAttribute("id", "read" + b);
  rd.setAttribute("onclick", "changeRead(" + b + ")");
  
  if (a.read) {
    rd.innerHTML = 'Read';
  }
  else {
    rd.innerHTML = 'Not Read';
  } 
  
  var cls = document.createElement("a");
  document.getElementById("container" + b).appendChild(cls);
  cls.setAttribute("id", "close" + b);
  cls.setAttribute("onclick", "delBook(" + b + ")");
  cls.innerHTML = 'x';
}

function addItem() {
  var x = document.getElementById("show");
   x.style.display = "block";
}

function closeForm() {
  var x = document.getElementById("show");
   x.style.display = "none";
}

function delBook(x) {
  delete myLibrary[x];
  
  var temp = document.getElementById("library");
  while (temp.hasChildNodes()) {
    temp.removeChild(temp.firstChild);
  }
  
  myLibrary.forEach(render);
}

function changeRead(x) {
  var temp = document.getElementById("library");
  while (temp.hasChildNodes()) {
    temp.removeChild(temp.firstChild);
  }
  
  var a = myLibrary[x].read;
  
  if (a) {
    myLibrary[x].read = false;
  }
  else {
    myLibrary[x].read = true;
  }
  
  myLibrary.forEach(render);  
}