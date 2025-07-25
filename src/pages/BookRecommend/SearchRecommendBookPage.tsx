//SearchRecommendBookPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookSearch, { type Book, type Action } from '../../components/Search/BookSearch'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'

export default function SearchRecommendBookPage() {
  const navigate = useNavigate()
   const { id } = useParams<{ id: string }>()

   const actions: Action[] = [
    {
      label: '추천하기',
      onClick: (book: Book) => {
        // 책 이야기 페이지로 이동
        navigate(`/${id}/${book.id}/EditPage`)
      },
      className: 'bg-[var(--button-brown,#A6917E)] text-white',
    },
    
  ]

  return (
    <div className="flex h-screen">
      <div className="absolute left-[315px] right-[42px] opacity-100 ">

        <Header pageTitle={'책 추천하기'} userProfile={{
          username: 'Luke',
          bio: '아 피곤하다.'
        }} 
        notifications={[]}
        customClassName="mb-19 mt-9" //112-36 = 76
        />


        {/* 메인 컨텐츠 자리 */}
        <div>
          <BookSearch SearchResultHeight = {287} actions={actions} />
        </div>
        
      </div>
    </div>
  )
}
