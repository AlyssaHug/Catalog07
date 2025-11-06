import Modal from "./Modal";
import BookForm from "./BookForm";
import { nanoid } from "nanoid";

function Button({ books, setBooks, selectedBookId, setSelectedBookId }) {
    function deleteBook() {
        const updatedBooks = books.filter((b) => b.id !== selectedBookId);
        setBooks(updatedBooks);
        setSelectedBookId(null);
    }

    function addBook(book) {
        setBooks([...books, { ...book, id: nanoid() }]);
    }
    function updateBook(updatedBook) {
        const updatedBooks = books.map((b) =>
            b.id === updatedBook.id ? updatedBook : b
        );
        setBooks(updatedBooks);
        setSelectedBookId(null);
    }

    const selectedBook = books.find((b) => b.id === selectedBookId);
    return (
        <div>
            <Modal
                btnClassName='button'
                btnLabel='Add new books!'>
                <BookForm addBook={addBook} />
            </Modal>
            <Modal
                btnClassName='edit'
                btnLabel='Edit'>
                <BookForm
                    book={selectedBook}
                    updateBook={updateBook}
                />
            </Modal>
            <div>
                <button
                    className='remove'
                    onClick={deleteBook}
                    disabled={!selectedBookId}>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}

export default Button;
