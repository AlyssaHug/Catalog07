import Book from "./Card";
export default function SimilarBooks({ books }) {
    if (!books?.length)
        return (
            <div>
                <h2>Similar Books</h2>
                <p>No similar books found.</p>
            </div>
        );

    return (
        <>
            <h2>Similar Books</h2>
            <div className='books similar-grid'>
                {books.map((b) => (
                    <Book
                        key={b.isbn13}
                        book={{
                            id: b.isbn13,
                            title: b.title,
                            image: b.image,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
