import "./App.css";
import Button from "./components/Buttons";
import Footer from "./components/Footer";
import Book from "./components/Card";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import LoanDetails from "./components/LoanDetails";
import BookDetails from "./components/BookDetails"; // NEW
import SimilarBooks from "./components/SimilarBooks";

function App() {
    const [detailBook, setDetailBook] = useState(null); // null → list view
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        if (!detailBook?.author) {
            setSimilar([]);
            return;
        }

        const author = detailBook.author.trim();
        const apiUrl = `https://api.itbook.store/1.0/search/${encodeURIComponent(
            author
        )}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            apiUrl
        )}`;

        console.log("Fetching:", proxyUrl); // Debug: See the URL

        fetch(proxyUrl)
            .then(async (r) => {
                // NEW: Log raw status & headers for debugging
                console.log("Response status:", r.status, r.statusText);
                console.log("Response headers:", [...r.headers.entries()]);

                if (!r.ok) {
                    throw new Error(`HTTP ${r.status}: ${r.statusText}`);
                }

                // NEW: Check content-type before parsing
                const contentType = r.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await r.text(); // Get raw text if not JSON
                    console.error("Non-JSON response:", text.substring(0, 200)); // First 200 chars
                    throw new Error("Invalid response format (not JSON)");
                }

                return r.json();
            })
            .then((data) => {
                console.log("Parsed data:", data); // Should show { total: "X", books: [...] }
                const filtered = (data.books || []).filter(
                    (b) => b.title !== detailBook.title
                );
                setSimilar(filtered.slice(0, 6));
            })
            .catch((err) => {
                console.error("Full fetch error:", err);
                setSimilar([]); // Graceful fallback
            });
    }, [detailBook]);

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
                ) : detailBook ? (
                    <BookDetails
                        book={detailBook}
                        onClose={() => setDetailBook(null)}>
                        <SimilarBooks books={similar} />
                    </BookDetails>
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
                                        onShowDetails={() =>
                                            setDetailBook(book)
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
