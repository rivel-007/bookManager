import { useState, useEffect } from 'react';
import { Plus, BookOpen, AlertCircle } from 'lucide-react';
import type { Book, BookFormData, SearchFilters, ReadingStatus, SortOption } from './types/Book';
import { bookApi } from './services/api';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchAndFilter from './components/SearchAndFilter';
import SortOptionsComponent from './components/SortOptions';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    author: '',
    category: '',
    status: ''
  });
  const [sortBy, setSortBy] = useState<SortOption>('registered_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 書籍データの読み込み
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let booksData: Book[];
      if (Object.values(filters).some(value => value !== '')) {
        booksData = await bookApi.searchBooks(filters);
      } else {
        booksData = await bookApi.getBooksSortedBy(sortBy);
      }
      
      setBooks(booksData);
    } catch (err) {
      setError('書籍データの読み込みに失敗しました');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  // カテゴリデータの読み込み
  const loadCategories = async () => {
    try {
      const categoriesData = await bookApi.getAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [filters, sortBy]);

  useEffect(() => {
    loadCategories();
  }, []);

  // 書籍の保存
  const handleSaveBook = async (bookData: BookFormData) => {
    try {
      if (editingBook) {
        await bookApi.updateBook(editingBook.id, bookData);
      } else {
        await bookApi.createBook(bookData);
      }
      
      setIsFormOpen(false);
      setEditingBook(null);
      await loadBooks();
      await loadCategories();
    } catch (err) {
      setError('書籍の保存に失敗しました');
      console.error('Error saving book:', err);
    }
  };

  // 書籍の削除
  const handleDeleteBook = async (id: number) => {
    if (window.confirm('この書籍を削除しますか？')) {
      try {
        await bookApi.deleteBook(id);
        await loadBooks();
      } catch (err) {
        setError('書籍の削除に失敗しました');
        console.error('Error deleting book:', err);
      }
    }
  };

  // ステータスの変更
  const handleStatusChange = async (id: number, status: string) => {
    try {
      const book = books.find(b => b.id === id);
      if (book) {
        const updatedBook = { ...book, status: status as ReadingStatus };
        await bookApi.updateBook(id, updatedBook as BookFormData);
        await loadBooks();
      }
    } catch (err) {
      setError('ステータスの更新に失敗しました');
      console.error('Error updating status:', err);
    }
  };

  // フィルターのクリア
  const handleClearFilters = () => {
    setFilters({
      title: '',
      author: '',
      category: '',
      status: ''
    });
  };

  // フォームの開閉
  const handleOpenForm = (book?: Book) => {
    setEditingBook(book || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">書籍管理アプリ</h1>
            </div>
            <button
              onClick={() => handleOpenForm()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              新しい書籍を追加
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            読書の記録を管理し、進捗を追跡しましょう
          </p>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* 検索・フィルター */}
        <SearchAndFilter
          filters={filters}
          categories={categories}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* 並び替え */}
        <SortOptionsComponent
          currentSort={sortBy}
          onSortChange={setSortBy}
        />

        {/* 書籍一覧 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">読み込み中...</p>
          </div>
        ) : (
          <BookList
            books={books}
            onEdit={handleOpenForm}
            onDelete={handleDeleteBook}
            onStatusChange={handleStatusChange}
          />
        )}

        {/* 書籍フォーム */}
        <BookForm
          book={editingBook}
          categories={categories}
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveBook}
        />
      </div>
    </div>
  );
}

export default App;
