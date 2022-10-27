import Header from "./components/Header";
import { Route,Routes } from 'react-router-dom';
import Home from "./components/Home";
import AddBooks from "./components/AddBooks";
import Books from "./components/Books/Books";
import About from "./components/About";
import BookDetail from "./components/Books/BookDetail";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/addBook" element={<AddBooks />} exact />
          <Route path="/books" element={<Books />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/updateDetails/:id" element={<BookDetail />} exact />
          
        </Routes>
      </main>
    </>
  );
}

export default App;
