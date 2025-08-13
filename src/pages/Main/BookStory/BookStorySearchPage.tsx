//BookStorySearchPage.tsx
import { useNavigate } from 'react-router-dom'
import BookSearch from '../../../components/Search/BookSearch';
import type { SearchBook as Book, Action } from '../../../types/BookSearchdto';
import Header from '../../../components/Header'


export default function BookStorySearchPage() {
  const navigate = useNavigate()

   const actions: Action[] = [
    {
      label: '선택하기',
      onClick: (book: Book) => {
        // 책 추천페이지로 이동
        navigate(`/bookstory/${book.isbn}/write`)
      },
      className: 'bg-[var(--button-brown,#A6917E)] text-white',
    },
  ]

  return (
    
    <div className="flex h-screen">
      <div className="absolute left-[315px] right-[42px] opacity-100 ">
        <Header pageTitle={'책 이야기'}
        customClassName="mt-15"
        />

        {/* 메인 컨텐츠 자리 */}
        <BookSearch SearchResultHeight = {235} actions={actions} />
      </div>
    </div>
  )
}
