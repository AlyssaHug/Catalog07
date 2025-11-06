import "./App.css";
import Button from "./components/Buttons";
import Footer from "./components/Footer";
import Book from "./components/Card";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import LoanDetails from "./components/LoanDetails";

function App() {
    const [books, setBooks] = useState(() => {
        const s = localStorage.getItem("books");
        return s ? JSON.parse(s) : [];
    });
    useEffect(
        () => localStorage.setItem("books", JSON.stringify(books)),
        [books]
    );

    //===Loan statements
    const [loans, setLoans] = useState(() => {
        const s = localStorage.getItem("loans");
        return s ? JSON.parse(s) : {};
    });
    useEffect(
        () => localStorage.setItem("loans", JSON.stringify(loans)),
        [loans]
    );

    //==Selections & filter const
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showLoanManager, setShowLoanManager] = useState(false);
    const [filter, setFilter] = useState("");

    const authors = new Set(books.map((book) => book.author).filter(Boolean));
    const displayed = filter
        ? books.filter((book) => book.author === filter)
        : books;

    //===Loan actions
    const loanBook = (bookId, borrower, weeks) => {
        setLoans((p) => ({ ...p, [bookId]: { borrower, weeks } }));
    };

    const returnBook = (bookId) => {
        setLoans((p) => {
            const { [bookId]: _, ...rest } = p;
            return rest;
        });
    };
    return (
        <div className='app'>
            <Header />
            <main>
                {showLoanManager ? (
                    <LoanDetails
                        books={books}
                        loans={loans}
                        onLoan={loanBook}
                        onReturn={returnBook}
                        onQuit={() => setShowLoanManager(false)}
                    />
                ) : (
                    <>
                        <div className='toolbar'>
                            <div>
                                <select
                                    className='filter'
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}>
                                    <option value=''>All Authors</option>
                                    {[...authors].map((a) => (
                                        <option
                                            key={a}
                                            value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className='manage'
                                onClick={() => setShowLoanManager(true)}>
                                Manage Loans
                            </button>
                        </div>
                        <div className='content'>
                            <Button
                                books={books}
                                setBooks={setBooks}
                                selectedBookId={selectedBookId}
                                setSelectedBookId={setSelectedBookId}
                            />

                            <div className='books'>
                                {displayed.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        isLoaned={!!loans[book.id]}
                                        isSelected={selectedBookId === book.id}
                                        onSelect={() =>
                                            setSelectedBookId((prev) =>
                                                prev === book.id
                                                    ? null
                                                    : book.id
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer text='Alyssa Huggins, 2025' />
        </div>
    );
}

export default App;
