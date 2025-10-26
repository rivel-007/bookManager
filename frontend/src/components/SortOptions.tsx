import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { SortOption } from '../types/Book';
import { SortOptions } from '../types/Book';

interface SortOptionsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortOptionsComponent: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const getSortIcon = (sort: SortOption) => {
    if (sort.includes('_desc')) {
      return <ArrowDown className="h-4 w-4" />;
    } else if (sort.includes('_asc')) {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowUpDown className="h-4 w-4" />;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ArrowUpDown className="h-5 w-5 mr-2" />
          並び替え
        </h3>
        <span className="text-sm text-gray-600">
          現在: {SortOptions.find(option => option.value === currentSort)?.label}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {SortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value as SortOption)}
            className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
              currentSort === option.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {getSortIcon(option.value as SortOption)}
            <span className="ml-1 hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <p>• 登録日: 書籍を登録した日付順</p>
        <p>• 読了日: 読了した日付順（未読・読書中の書籍は最後に表示）</p>
        <p>• タイトル・著者: アルファベット順</p>
      </div>
    </div>
  );
};

export default SortOptionsComponent;
