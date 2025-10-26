import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { SearchFilters } from '../types/Book';

interface SearchAndFilterProps {
  filters: SearchFilters;
  categories: string[];
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  categories,
  onFiltersChange,
  onClearFilters
}) => {
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          検索・フィルター
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            フィルターをクリア
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="title-search" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="title-search"
              value={filters.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="タイトルで検索"
            />
          </div>
        </div>

        <div>
          <label htmlFor="author-search" className="block text-sm font-medium text-gray-700 mb-1">
            著者
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="author-search"
              value={filters.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="著者で検索"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">すべてのカテゴリ</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            読書ステータス
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">すべてのステータス</option>
            <option value="UNREAD">未読</option>
            <option value="READING">読書中</option>
            <option value="COMPLETED">読了</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.title && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              タイトル: {filters.title}
            </span>
          )}
          {filters.author && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              著者: {filters.author}
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              カテゴリ: {filters.category}
            </span>
          )}
          {filters.status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              ステータス: {
                filters.status === 'UNREAD' ? '未読' :
                filters.status === 'READING' ? '読書中' : '読了'
              }
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
