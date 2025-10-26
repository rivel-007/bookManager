package com.rivel.bookmanager.Service;

import com.rivel.bookmanager.Entity.Book;
import com.rivel.bookmanager.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepository;
    
    // 全書籍取得
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    // IDで書籍取得
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    // 書籍作成
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
    
    // 書籍更新
    public Book updateBook(Long id, Book bookDetails) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setCategory(bookDetails.getCategory());
            book.setStatus(bookDetails.getStatus());
            book.setMemo(bookDetails.getMemo());
            return bookRepository.save(book);
        }
        return null;
    }
    
    // 書籍削除
    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // 検索・フィルター機能
    public List<Book> searchBooks(String title, String author, String category, Book.ReadingStatus status) {
        return bookRepository.findBySearchCriteria(title, author, category, status);
    }
    
    // 並び替え機能
    public List<Book> getBooksSortedBy(String sortBy) {
        switch (sortBy.toLowerCase()) {
            case "registered_desc":
                return bookRepository.findAllByOrderByRegisteredAtDesc();
            case "registered_asc":
                return bookRepository.findAllByOrderByRegisteredAtAsc();
            case "completed_desc":
                return bookRepository.findAllByOrderByCompletedAtDesc();
            case "completed_asc":
                return bookRepository.findAllByOrderByCompletedAtAsc();
            case "title":
                return bookRepository.findAllByOrderByTitleAsc();
            case "author":
                return bookRepository.findAllByOrderByAuthorAsc();
            default:
                return bookRepository.findAll();
        }
    }
    
    // カテゴリ一覧取得
    public List<String> getAllCategories() {
        return bookRepository.findAll()
                .stream()
                .map(Book::getCategory)
                .distinct()
                .sorted()
                .toList();
    }
}
