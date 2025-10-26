package com.rivel.bookmanager.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String author;
    
    @Column(nullable = false)
    private String category;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReadingStatus status;
    
    @Column(columnDefinition = "TEXT")
    private String memo;
    
    @Column(nullable = false)
    private LocalDateTime registeredAt;
    
    private LocalDateTime completedAt;
    
    public enum ReadingStatus {
        UNREAD("未読"),
        READING("読書中"),
        COMPLETED("読了");
        
        private final String displayName;
        
        ReadingStatus(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    @PrePersist
    protected void onCreate() {
        registeredAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        if (status == ReadingStatus.COMPLETED && completedAt == null) {
            completedAt = LocalDateTime.now();
        } else if (status != ReadingStatus.COMPLETED) {
            completedAt = null;
        }
    }
}
