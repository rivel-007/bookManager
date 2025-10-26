import axios from 'axios';
import type { Book, BookFormData, SearchFilters, SortOption } from '../types/Book';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  // 全書籍取得
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
  },

  // IDで書籍取得
  getBookById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // 書籍作成
  createBook: async (bookData: BookFormData): Promise<Book> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // 書籍更新
  updateBook: async (id: number, bookData: BookFormData): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // 書籍削除
  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  // 検索・フィルター
  searchBooks: async (filters: SearchFilters): Promise<Book[]> => {
    const params = new URLSearchParams();
    if (filters.title) params.append('title', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/books/search?${params.toString()}`);
    return response.data;
  },

  // 並び替え
  getBooksSortedBy: async (sortBy: SortOption): Promise<Book[]> => {
    const response = await api.get(`/books/sorted?sortBy=${sortBy}`);
    return response.data;
  },

  // カテゴリ一覧取得
  getAllCategories: async (): Promise<string[]> => {
    const response = await api.get('/books/categories');
    return response.data;
  },
};
