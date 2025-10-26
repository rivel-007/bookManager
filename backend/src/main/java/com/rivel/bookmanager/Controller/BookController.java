package com.rivel.bookmanager.Controller;

import com.rivel.bookmanager.Entity.Book;
import com.rivel.bookmanager.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;

    // 全書籍取得
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // IDで書籍取得
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // 書籍作成
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book createdBook = bookService.createBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    // 書籍更新
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        if (updatedBook != null) {
            return ResponseEntity.ok(updatedBook);
        }
        return ResponseEntity.notFound().build();
    }

    // 書籍削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        boolean deleted = bookService.deleteBook(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // 検索・フィルター機能
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Book.ReadingStatus status) {
        List<Book> books = bookService.searchBooks(title, author, category, status);
        return ResponseEntity.ok(books);
    }

    // 並び替え機能
    @GetMapping("/sorted")
    public ResponseEntity<List<Book>> getBooksSortedBy(@RequestParam String sortBy) {
        List<Book> books = bookService.getBooksSortedBy(sortBy);
        return ResponseEntity.ok(books);
    }

    // カテゴリ一覧取得
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = bookService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
