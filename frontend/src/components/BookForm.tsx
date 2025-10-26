import React, { useState, useEffect } from 'react';
import type { Book, BookFormData } from '../types/Book';
import { X, Save } from 'lucide-react';

interface BookFormProps {
  book?: Book | null;
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookData: BookFormData) => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, categories, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        category: '',
        status: 'UNREAD', 
        memo: ''
      });

    const [errors, setErrors] = useState<Partial<BookFormData>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        status: book.status,
        memo: book.memo || ''
      });
    } else {
      setFormData({
        title: '',
        author: '',
        category: '',
        status: 'UNREAD', 
        memo: ''
      });
    }
    setErrors({});
  }, [book, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }
    if (!formData.author.trim()) {
      newErrors.author = '著者は必須です';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'カテゴリは必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: keyof BookFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {book ? '書籍を編集' : '新しい書籍を追加'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="書籍のタイトルを入力"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              著者 *
            </label>
            <input
              type="text"
              id="author"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="著者名を入力"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリ *
            </label>
            <div className="flex space-x-2">
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">カテゴリを選択</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="新しいカテゴリを入力"
              />
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              読書ステータス
            </label>
            <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="UNREAD">未読</option>
                <option value="READING">読書中</option>
                <option value="COMPLETED">読了</option>
                </select>
          </div>
          
          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-1">
              メモ
            </label>
            <textarea
              id="memo"
              value={formData.memo}
              onChange={(e) => handleInputChange('memo', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="感想やメモを入力（任意）"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {book ? '更新' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
