import Book from "./Card";
export default function SimilarBooks({ books }) {
    if (!books?.length) return <p>No similar books found.</p>;

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
