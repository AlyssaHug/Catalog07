import Book from "./Card";
import { useState } from "react";

export default function LoanManager({
    books,
    loans,
    onLoan,
    onReturn,
    onQuit,
}) {
    const [borrower, setBorrower] = useState("");
    const [selectedBookId, setSelectedBookId] = useState("");
    const [weeks, setWeeks] = useState("1");
    const [toast, setToast] = useState("");

    const availableBooks = books.filter((b) => !loans[b.id]);
    const isFormDisabled = availableBooks.length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!borrower.trim() || !selectedBookId) return;

        onLoan(selectedBookId, borrower.trim(), Number(weeks));
        setToast(
            `"${
                books.find((b) => b.id === selectedBookId).title
            }" loaned to ${borrower}!`
        );
        setBorrower("");
        setSelectedBookId("");
        setWeeks("1");
        setTimeout(() => setToast(""), 2000);
    };

    const loanedBooks = Object.entries(loans).map(([id, info]) => ({
        ...books.find((b) => b.id === id),
        loanInfo: info,
    }));

    return (
        <div className='loan-manager'>
            <header className='loan-header'>
                <h1>Manage Loans</h1>
                <button
                    className='manage'
                    onClick={onQuit}>
                    Quit
                </button>
            </header>

            {toast && <div className='toast'>{toast}</div>}

            {isFormDisabled ? (
                <section className='unavailable'>
                    <p className='msg'>
                        All books are currently on loan.
                        <br />
                        <strong>No new loans can be created.</strong>
                    </p>
                </section>
            ) : (
                <section className='loan-section'>
                    <form
                        onSubmit={handleSubmit}
                        className='loan-form'>
                        <div className='form-row'>
                            <label>Borrower</label>
                            <input
                                className='input'
                                type='text'
                                value={borrower}
                                onChange={(e) => setBorrower(e.target.value)}
                                placeholder='John Smith'
                                required
                            />
                        </div>

                        <div className='form-row'>
                            <label>Book:</label>
                            <select
                                className='input'
                                value={selectedBookId}
                                onChange={(e) =>
                                    setSelectedBookId(e.target.value)
                                }
                                required>
                                <option
                                    value=''
                                    disabled>
                                    Select a book
                                </option>
                                {availableBooks.map((b) => (
                                    <option
                                        key={b.id}
                                        value={b.id}>
                                        {b.title} – {b.author}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='form-row'>
                            <label>Loan period: (in weeks)</label>
                            <input
                                className='input'
                                type='number'
                                min='1'
                                value={weeks}
                                onChange={(e) => setWeeks(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='submit'>
                            Submit
                        </button>
                    </form>
                </section>
            )}
            <section className='loaned-section'>
                <h2>Currently on loan</h2>
                {loanedBooks.length === 0 ? (
                    <p className='empty-msg'>No books are currently loaned.</p>
                ) : (
                    <div className='books'>
                        {loanedBooks.map((b) => (
                            <Book
                                key={b.id}
                                book={b}
                                isLoaned={true}
                                loanInfo={b.loanInfo}
                                onReturn={() => onReturn(b.id)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
