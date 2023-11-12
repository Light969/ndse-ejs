const express = require('express');
const router = express.Router();

// const booksMulter = require('../middleware/booksMulter')

const { v4: uuid } = require('uuid');

class Book {
    constructor(title = '', authors = '', description = '', favorite = '', fileCover = '', fileName = '', fileBook = '') {
        this.title = title;
        this.authors = authors;
        this.description = description;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = uuid();
        this.fileBook = fileBook;   //новое поле
    }
}

const stor = {
    books: [
        new Book(
        `К чёрту всё! Берись и делай!`, 
        `Ричард Бренсон`, 
        `Биография Ричарда`, 
        `Любимая книга`, 
        `Обложка файла`, 
        `Имя файла`, 
        `Файл книги`
        )
    ],
    user: {
        id: 1, 
        mail: "test@mail.ru",
    },
}

router.post('/api/user/login', (req, res) => {
    const {user} = stor;
    res.status(201);
    res.json(user);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.render('../views/books/index', {
        title: 'Книги',
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("../views/books/create", {
        title: "Книга | Создание книги",
        books: {},
    });
});

router.post('/create', 
    // booksMulter.single('filebook'), 
    (req, res) => {
    const {books} = stor;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName,
        fileBook,
    } = req.body;

    // const fileBook = req.file.path;

    const newBook = new Book(
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName,
        fileBook
    );
    books.push(newBook);
    res.redirect(`/api/books`);
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        res.render('../views/books/view', {
            title: 'Описание книги',
            books: books[idx],
        });
    } else { 
        res.status(404).redirect('/404');
    }

});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("../views/books/update", {
            title: "Книга | Редактирование книги",
            books: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', 
    // booksMulter.single('filebook'), 
    (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    } = req.body;
   
    // const fileBook = req.file.path;
 
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title: title || books[idx].title, 
            authors: authors || books[idx].authors, 
            description: description || books[idx].description, 
            favorite: favorite || books[idx].favorite, 
            fileCover: fileCover || books[idx].fileCover, 
            fileName: fileName || books[idx].fileName,
            fileBook: fileName || books[idx].fileBook
        }

        res.redirect(`/api/books/${id}`);

    } else { 
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/api/books`);
    } else { 
        res.status(404).redirect('/404');
    }
});

// router.get('/:id/download', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);
//     if (idx !== -1) {
//         res.download(`${__dirname}/../public/books/${books[idx].fileBook}`, books[idx].fileName, err => {
//             if (err) {
//               res.status(404);
//               res.json(err);
//             }
//         });
//     } else { 
//         res.status(404);
//         res.json('404 | Файл не найден')
//     }
// });

module.exports = router;
