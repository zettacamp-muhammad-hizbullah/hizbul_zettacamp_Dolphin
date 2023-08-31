// {
//     id: Math.random().toString(36).substr(2, 9);,
//     title: string,
//     author: string,
//     description: string,
// }
const BOOK_KEY = 'books';
addEventListener('DOMContentLoaded', async (event) => {
  await generateListData();

  let removeAllBookButtonEl = document.getElementById('remove-all-book');
  removeAllBookButtonEl.addEventListener('click', function (e) {
    e.preventDefault();
  });

  document.getElementById('delete-button').addEventListener('click', function (event) {
    event.preventDefault();
  });

  document.getElementById('show-button-form').addEventListener('click', function (event) {
    event.preventDefault();
  });

  alert('FYI, that only the button you clicked will perform the action, so other buttons will be reset to the beginning.');
});

const addNewBook = (data) => {
  let payload = {
    ...data,
    id: uniqueId(),
  };

  const books = getBooks();
  books.push(payload);
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};

const updateBook = async (data, id) => {
  const books = getBooks();
  const currentIndexBook = await findIndexBookById(id);
  books[currentIndexBook] = { ...data };
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};

const deleteBook = async (id) => {
  const books = getBooks();
  const currentIndexBook = await findIndexBookById(id);
  books.splice(currentIndexBook, 1);
  console.log(books);
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
};

const getBooks = () => {
  const books = JSON.parse(localStorage.getItem(BOOK_KEY));
  return books || [];
};

const getBook = async (id) => {
  const books = await getBooks();
  const book = await books.filter((book) => book?.id === id);
  return book[0] || null;
};

const findIndexBookById = async (id) => {
  const books = getBooks();
  const index = await books.findIndex((book) => book.id === id);
  return index;
};

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

const toggleShowFormNewBook = (val) => {
  let showButtonFormEl = document.getElementById('show-button-form');
  let buttonAddNewBookEl = document.getElementById('save-button');

  let nameElement = document.getElementById('name');
  let authorElement = document.getElementById('author');
  let descriptionElement = document.getElementById('description');

  if (val) {
    nameElement.classList.remove('hidden');
    authorElement.classList.remove('hidden');
    descriptionElement.classList.remove('hidden');
    buttonAddNewBookEl.classList.remove('hidden');
    showButtonFormEl.classList.add('hidden');
  } else {
    buttonAddNewBookEl.classList.add('hidden');
    showButtonFormEl.classList.remove('hidden');
  }
};

const handleSubmitNewBook = () => {
  let nameElement = document.getElementById('name');
  let authorElement = document.getElementById('author');
  let descriptionElement = document.getElementById('description');

  let showButtonFormEl = document.getElementById('show-button-form');
  let buttonAddNewBookEl = document.getElementById('save-button');

  if (nameElement.value && authorElement.value && descriptionElement.value) {
    addNewBook({
      name: nameElement.value,
      author: authorElement.value,
      description: descriptionElement.value,
    });
  }

  nameElement.value = '';
  authorElement.value = '';
  descriptionElement.value = '';

  showButtonFormEl.classList.remove('hidden');
  buttonAddNewBookEl.classList.add('hidden');
  nameElement.classList.add('hidden');
  authorElement.classList.add('hidden');
  descriptionElement.classList.add('hidden');

  generateListData();
};

const handleEditBook = async (id) => {
  const book = await getBook(id);
  let deleteButtonEl = document.querySelector(`.delete_button_${id}`);
  deleteButtonEl.classList.add('hidden');

  let editButtonEl = document.getElementById(`edit-button-${id}`);
  let saveButtonEl = document.getElementById(`save-button-${id}`);
  editButtonEl.classList.add('hidden');
  saveButtonEl.classList.remove('hidden');

  let inputNameEl = document.getElementById(`name-${id}`);
  let inputAuthorEl = document.getElementById(`author-${id}`);
  let inputDescEl = document.getElementById(`description-${id}`);
  inputNameEl.classList.remove('hidden');
  inputAuthorEl.classList.remove('hidden');
  inputDescEl.classList.remove('hidden');

  let valNameEl = document.getElementById(`val-name-${id}`);
  let valAuthorEl = document.getElementById(`val-author-${id}`);
  let valDescEl = document.getElementById(`val-description-${id}`);
  valNameEl.classList.add('hidden');
  valAuthorEl.classList.add('hidden');
  valDescEl.classList.add('hidden');

  inputNameEl.value = book?.name;
  inputAuthorEl.value = book?.author;
  inputDescEl.value = book?.description;
};

const handleUpdateBook = async (id) => {
  let inputNameEl = document.getElementById(`name-${id}`);
  let inputAuthorEl = document.getElementById(`author-${id}`);
  let inputDescEl = document.getElementById(`description-${id}`);

  let editButtonEl = document.getElementById(`edit-button-${id}`);
  let saveButtonEl = document.getElementById(`save-button-${id}`);
  editButtonEl.classList.remove('hidden');
  saveButtonEl.classList.add('hidden');

  console.log(inputDescEl.value);

  await updateBook(
    {
      id: id,
      name: inputNameEl.value,
      author: inputAuthorEl.value,
      description: inputDescEl.value,
    },
    id
  );

  inputNameEl.classList.add('hidden');
  inputAuthorEl.classList.add('hidden');
  inputDescEl.classList.add('hidden');

  let valNameEl = document.getElementById(`val-name-${id}`);
  let valAuthorEl = document.getElementById(`val-author-${id}`);
  let valDescEl = document.getElementById(`val-description-${id}`);
  valNameEl.classList.remove('hidden');
  valAuthorEl.classList.remove('hidden');
  valDescEl.classList.remove('hidden');

  generateListData();
};

const handleDeleteBook = async (id) => {
  await clearListData(getBooks());
  await deleteBook(id);
  generateListData();
};

const removeAllBook = () => {
  const books = getBooks();
  clearListData(books);
  localStorage.removeItem(BOOK_KEY);
  generateListData()
};

const generateListData = async () => {
  const books = await getBooks();
  await clearListData(books);
  let listDataBookEl = document.getElementById('list-data-books');
  let totalBookEl = document.getElementById('total-book');
  totalBookEl.innerText = `Total: ${books.length}`;

  await books?.map((book, index) => {
    let row = document.createElement('tr');
    row.setAttribute('id', `row-${book?.id}`);
    row.innerHTML = `
        <td>${index + 1}</td>
        <td><span id="val-name-${book?.id}">${book?.name}</span> <input class="hidden" id="name-${book?.id}" /></td>
        <td><span id="val-author-${book?.id}">${book?.author}</span> <input class="hidden" id="author-${book?.id}" /></td>
        <td><span id="val-description-${book?.id}">${book?.description}</span> <input class="hidden" id="description-${book?.id}" /></td>
        <td>
            <button id="save-button-${book?.id}" class="hidden update_button" onclick="handleUpdateBook('${book?.id}')">Save</button>
            <button id="edit-button-${book?.id}" class="edit_button" onclick="handleEditBook('${book?.id}')">Edit</button>
            <button id="delete-button" class="delete_button_${book?.id} delete_button" onclick="handleDeleteBook('${
      book?.id
    }')">Delete</button>
        </td>`;
    listDataBookEl.appendChild(row);
  });
};

const clearListData = async (books) => {
  if (books.length > 0) {
    await books?.map(async (book) => {
      //   console.log('remove', book);
      let currentRow = document.getElementById(`row-${book?.id}`);
      currentRow?.remove();
    });
  }
};
