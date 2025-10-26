package com.rivel.bookmanager.Repository;

import com.rivel.bookmanager.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // タイトルで検索（部分一致）
    List<Book> findByTitleContainingIgnoreCase(String title);
    
    // 著者で検索（部分一致）
    List<Book> findByAuthorContainingIgnoreCase(String author);
    
    // カテゴリで検索
    List<Book> findByCategory(String category);
    
    // 読書ステータスで検索
    List<Book> findByStatus(Book.ReadingStatus status);
    
    // 複数条件での検索
    @Query("SELECT b FROM Book b WHERE " +
           "(:title IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
           "(:author IS NULL OR LOWER(b.author) LIKE LOWER(CONCAT('%', :author, '%'))) AND " +
           "(:category IS NULL OR b.category = :category) AND " +
           "(:status IS NULL OR b.status = :status)")
    List<Book> findBySearchCriteria(@Param("title") String title,
                                   @Param("author") String author,
                                   @Param("category") String category,
                                   @Param("status") Book.ReadingStatus status);
    
    // 登録日順で並び替え（新しい順）
    List<Book> findAllByOrderByRegisteredAtDesc();
    
    // 登録日順で並び替え（古い順）
    List<Book> findAllByOrderByRegisteredAtAsc();
    
    // 読了日順で並び替え（新しい順）
    List<Book> findAllByOrderByCompletedAtDesc();
    
    // 読了日順で並び替え（古い順）
    List<Book> findAllByOrderByCompletedAtAsc();
    
    // タイトル順で並び替え
    List<Book> findAllByOrderByTitleAsc();
    
    // 著者順で並び替え
    List<Book> findAllByOrderByAuthorAsc();
}

