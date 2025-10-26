export type ReadingStatus = 'UNREAD' | 'READING' | 'COMPLETED';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  status: ReadingStatus;
  memo?: string;
  registeredAt: string;
  completedAt?: string;
}

export const ReadingStatusLabels: Record<ReadingStatus, string> = {
  UNREAD: '未読',
  READING: '読書中',
  COMPLETED: '読了'
};

export interface BookFormData {
  title: string;
  author: string;
  category: string;
  status: ReadingStatus;
  memo: string;
}

export interface SearchFilters {
  title: string;
  author: string;
  category: string;
  status: ReadingStatus | '';
}

export type SortOption = 
  | 'registered_desc' 
  | 'registered_asc' 
  | 'completed_desc' 
  | 'completed_asc' 
  | 'title' 
  | 'author';

export const SortOptions = [
  { value: 'registered_desc', label: '登録日（新しい順）' },
  { value: 'registered_asc', label: '登録日（古い順）' },
  { value: 'completed_desc', label: '読了日（新しい順）' },
  { value: 'completed_asc', label: '読了日（古い順）' },
  { value: 'title', label: 'タイトル順' },
  { value: 'author', label: '著者順' }
];
