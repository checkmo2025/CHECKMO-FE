import type { ApiResponse } from './apiResponse';

export interface SearchBook{
  isbn: string,
  title: string,
  author: string,
  imgUrl: string,
  publisher: string,
  description: string
}

export interface Action {
  label: string
  onClick: (SearchBook: SearchBook) => void
  className?: string
  iconUrl?: string
}

export interface BookSearchProps {
  SearchResultHeight : number,
  actions?: Action[]
}

export type BookSearchResponse = ApiResponse<{
  bookInfoDetailResponseList: SearchBook[];
  hasNext: boolean;
  currentPage: number;
}>

export type BookSearchResult = BookSearchResponse['result'];
