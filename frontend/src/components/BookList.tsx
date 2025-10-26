import React from 'react';
import type { Book } from '../types/Book';
import { ReadingStatusLabels } from '../types/Book';
import { Edit, Trash2, BookOpen, Calendar, User, Tag } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNREAD':
        return 'bg-gray-100 text-gray-800';
      case 'READING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {books.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p>書籍が登録されていません</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {book.title}
                </h3>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="編集"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="削除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="line-clamp-1">{book.author}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{book.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>登録: {formatDate(book.registeredAt)}</span>
                </div>
                {book.completedAt && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>読了: {formatDate(book.completedAt)}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                  {ReadingStatusLabels[book.status as keyof typeof ReadingStatusLabels]}
                </span>
              </div>

              {book.memo && (
                <div className="mb-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{book.memo}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <select
                  value={book.status}
                  onChange={(e) => onStatusChange(book.id, e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                >
                  <option value="UNREAD">未読</option>
                  <option value="READING">読書中</option>
                  <option value="COMPLETED">読了</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
