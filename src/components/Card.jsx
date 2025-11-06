export default function Book({
    book,
    isLoaned,
    loanInfo,
    onReturn,
    isSelected,
    onSelect,
    onShowDetails,
    hideDetailsButton = false,
}) {
    const imageUrl = book.imageUrl || book.image;

    return (
        <article
            className={`card ${isLoaned ? "loaned" : ""} ${
                isSelected ? "darkened" : ""
            }`}
            onClick={onSelect}
            style={{ cursor: onSelect ? "pointer" : "default" }}>
            {isLoaned && <div className='loan-banner'>Loaned Out!</div>}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={book.title}
                    className='cardImg'
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                    }}
                />
            ) : null}
            <h3 className='title'>{book.title}</h3>
            <p className='author'>{book.author}</p>
            {book.year && <p className='year'>{book.year}</p>}

            {isLoaned && loanInfo && (
                <div className='loan-info'>
                    <p>
                        <strong>Borrower:</strong> {loanInfo.borrower}
                    </p>
                    <p>
                        <strong>Weeks:</strong> {loanInfo.weeks}
                    </p>
                    {onReturn && (
                        <button
                            className='return'
                            onClick={(e) => {
                                e.stopPropagation();
                                onReturn();
                            }}>
                            Return
                        </button>
                    )}
                </div>
            )}

            {!hideDetailsButton && onShowDetails && (
                <button
                    className='details-btn'
                    onClick={(e) => {
                        e.stopPropagation();
                        onShowDetails();
                    }}>
                    View Details
                </button>
            )}
        </article>
    );
}
