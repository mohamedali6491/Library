let id = localStorage.length - 1;
const m = document.getElementById('book_info');

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
book.prototype.info = function () { return `this book name is ${this.title} by ${this.author} , it's have ${this.pages} pages and you ${this.read} read it`; };
book.prototype.yearOfPublish = function () { return this.pages; };

const insert_book = document.querySelector('.insert');
const ins = document.getElementById('insert');
const cont = document.getElementById('container');
const add_book = document.getElementById('btn_add');
add_book.addEventListener('click', () => {
  ins.classList.remove('dis');
  //body.classList.add('contain');
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', () => {
  ins.classList.add('dis');
});

const addBook = document.getElementById('save');
addBook.addEventListener('click', () => {
  book_addition();
});

// const status=document.getElementById('status');
// status.addEventListener('click',()=>{
//     if(b.read){
//         c=document.querySelector('.state');

//     }
//     else{
//         document.querySelector('.state').value=true;
//     }
// });


function book_addition() {
  let t = document.getElementById('title_txt').value;
  let a = document.getElementById('author_txt').value;
  let p = document.getElementById('pages_txt').value;
  let newBook = new book(t, a, p, false);
  id++;
  saveData(id, newBook);
  const m = document.getElementById('book_info');
  const b = document.createElement('div');
  b.classList.add('book_in');
  b.setAttribute('id', 'book_in');
  b.setAttribute('data-key', id);
  let x = `<h2>${newBook.title}</h2>
           <h4> Author: ${newBook.author}</h4>
           <h4>Pages ${newBook.pages}</h4> 
           <h4 class="state">Finish reading: ${newBook.read}</h4><div id="btn_book">
           <button id="status" class="btn x" onclick="sts(${id})">Status</button>
           <button id="rmv" class="btn x" onclick="rmv(${id})">remove</button>
           </div>`;
  b.innerHTML = x;
  m.appendChild(b);
  numOfBooks();
  finishedBooks();
  total_pages();
}

function saveData(key, obj) {
  if (localStorage) {
    localStorage[key] = JSON.stringify(obj);
  }
}

function loadData(key) {
  let obj = null;
  if (localStorage && localStorage[key]) {
    obj = JSON.parse(localStorage[key]);
    return obj;
  }
}

function displayData() {
  if (localStorage) {
    let z;
    let y;
    for (i = localStorage.length -1; i >= 0; i--) {
      z = localStorage.key(i);
      y = loadData(z);
      const b = document.createElement('div');
      b.classList.add('book_in');
      b.setAttribute('id', 'book_in');
      b.setAttribute('data-key', z);
      let x = `<h2>${y.title}</h2>
           <h4> Author: ${y.author}</h4>
           <h4>Pages ${y.pages}</h4> 
           <h4 class="state">Finish reading: ${y.read}</h4><div id="btn_book">
           <button id="status" class="btn x" onclick="sts(${z})">Status</button>
           <button id="rmv" class="btn x" onclick="rmv(${z})">remove</button>
           </div>`;
      b.innerHTML = x;
      m.appendChild(b);
    }
  }
}

const clearBtn = document.getElementById('btn_clear');
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  while (m.firstChild) {
    m.removeChild(m.firstChild);
  }
});

function rmv(n){
  const f=document.querySelector(`div[data-key="${n}"]`);
  m.removeChild(f);
  localStorage.removeItem(n);
  numOfBooks();
  finishedBooks();
  total_pages();
}

function sts(n){
  const st=document.querySelector(`div[data-key="${n}"]`);
  const s=document.querySelector(`div[data-key="${n}"]> .state`);
  let boal=s.textContent.slice(16);
  let z,y;
  if(boal=='false'){
    boal='true';
    s.textContent=`Finish reading: ${boal}`;
  }else if(boal=='true'){
    boal='false';
    s.textContent=`Finish reading: ${boal}`;
  }
  //z = localStorage.key(n);
  //console.log(z);
  //if (localStorage && localStorage[key]) {
  //obj = JSON.parse(localStorage[key]);
  y = JSON.parse(localStorage.getItem(n));
  console.log(y.read);
  y.read=boal;
  saveData(n,y);
  finishedBooks();
}

function numOfBooks(){
  const numBooks=document.getElementById('no_book');
  numBooks.textContent=localStorage.length;
}

function finishedBooks(){
  let c=0,z,y=[];
  for(i=0;i<=localStorage.length-1;i++){
    z=localStorage.key(i);
    y[i]=loadData(z);
    if(y[i].read=='true'){
      c++;
    }
  }
  const fin_books=document.getElementById('finish');
  fin_books.textContent=c;
}

function total_pages(){
  let c=0,z,y=[];
  for(i=0;i<=localStorage.length-1;i++){
    z=localStorage.key(i);
    y[i]=loadData(z);
    c+=parseInt(y[i].pages);
  }
  const tot_pages=document.getElementById('total');
  tot_pages.textContent=c;
}

window.onload = function(){
displayData();
numOfBooks();
finishedBooks();
total_pages();
}