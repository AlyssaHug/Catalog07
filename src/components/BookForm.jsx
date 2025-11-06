import { nanoid } from "nanoid";

function BookForm({ addBook, updateBook, book, closeModal }) {
    const isEditing = !!book;
    const initialValues = isEditing
        ? book
        : {
              title: "",
              author: "",
              publisher: "",
              year: "",
              language: "",
              pages: "",
              image: "",
              price: "",
              imageUrl: "",
          };

    const handleSubmit = (e) => {
        const data = new FormData(e.target);
        const newBook = {
            id: isEditing ? book.id : nanoid(),
            title: data.get("title"),
            author: data.get("author"),
            publisher: data.get("publisher"),
            publicationYear: data.get("year"),
            language: data.get("language"),
            pages: data.get("pages"),
            image: data.get("image"),
            price: data.get("price"),
            url: data.get("url"),
        };

        if (isEditing) {
            updateBook(newBook);
        } else {
            addBook(newBook);
        }
        e.target.reset();
        closeModal();
    };

    return (
        <div className='form-container'>
            <h2 className='form-title'>Add a new book!</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-inputs'>
                    <div className='form-control'>
                        <label htmlFor='title'>Title:</label>
                        <input
                            type='text'
                            name='title'
                            placeholder='book title'
                            defaultValue={initialValues.title}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='author'>Author:</label>
                        <input
                            type='text'
                            name='author'
                            placeholder='author'
                            defaultValue={initialValues.author}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='publisher'>Publisher:</label>
                        <input
                            type='text'
                            name='publisher'
                            placeholder='publisher'
                            defaultValue={initialValues.publisher}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='publicationYear'>
                            Publication Year:
                        </label>
                        <input
                            type='number'
                            name='publicationYear'
                            defaultValue={initialValues.year}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='language'>Language:</label>
                        <input
                            type='text'
                            name='language'
                            placeholder='language'
                            defaultValue={initialValues.language}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='pages'>Pages:</label>
                        <input
                            type='number'
                            name='pages'
                            defaultValue={initialValues.pages}
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='image'>Image URL:</label>
                        <input
                            type='url'
                            name='image'
                            placeholder='image URL'
                            defaultValue={initialValues.imageUrl}
                        />
                    </div>
                </div>
                <button
                    className='save'
                    type='submit'>
                    {isEditing ? "Update" : "Save"}
                </button>
            </form>
        </div>
    );
}

export default BookForm;
