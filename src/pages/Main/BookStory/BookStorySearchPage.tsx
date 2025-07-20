//BookStorySearchPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookSearch, { type Book, type Action } from '../../../components/Search/BookSearch';
import Header from '../../../components/Header'


export default function BookStorySearchPage() {
  const navigate = useNavigate()

   const actions: Action[] = [
    {
      label: '선택하기',
      onClick: (book: Book) => {
        // 책 추천페이지로 이동
        navigate(`/bookstory/${book.id}`)
      },
      className: 'bg-[var(--button-brown,#A6917E)] text-white',
    },
  ]

  return (
    
    <div className="flex h-screen">
      <div className="absolute left-[315px] right-[42px] opacity-100 ">
        <div className = "">
          <Header pageTitle={'title'} userProfile={{
            username: '123',
            bio: '123'
          }} notifications={[]}/>
        </div>

        {/* 메인 컨텐츠 자리 */}
        <BookSearch actions={actions} />
      </div>
    </div>
  )
}
