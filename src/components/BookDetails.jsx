export default function BookDetails({ book, onClose, children }) {
    const img = book.image || book.imageUrl || "";

    return (
        <section className='book-details'>
            <button
                className='close-details'
                onClick={onClose}>
                × Close
            </button>

            <div className='details-grid'>
                {img && (
                    <img
                        src={img}
                        alt={book.title}
                        className='details-cover'
                        onError={(e) => (e.target.style.display = "none")}
                    />
                )}

                <div className='details-info'>
                    <h1>{book.title}</h1>
                    <p>
                        <strong>Author:</strong> {book.author || "-"}
                    </p>
                    <p>
                        <strong>Publisher:</strong> {book.publisher || "-"}
                    </p>
                    <p>
                        <strong>Year:</strong>{" "}
                        {book.publicationYear || book.year || "-"}
                    </p>
                    <p>
                        <strong>Pages:</strong> {book.pages || "-"}
                    </p>
                    <p>
                        <strong>Language:</strong> {book.language || "-"}
                    </p>
                    <p>
                        <strong>Price:</strong>{" "}
                        {book.price ? `$${book.price}` : "-"}
                    </p>
                    {book.url && (
                        <p>
                            <a
                                href={book.url}
                                target='_blank'
                                rel='noopener'>
                                More info (external)
                            </a>
                        </p>
                    )}
                </div>
            </div>

            {/* similar books slot */}
            <div className='similar-section'>{children}</div>
        </section>
    );
}
