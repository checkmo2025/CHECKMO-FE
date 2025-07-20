//BookAddPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookSearch, { type Book, type Action } from '../../../components/Search/BookSearch'
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header'

export default function BookAddPage() {
  const navigate = useNavigate()
   const { prefix } = useParams<{ prefix: string }>()

   const actions: Action[] = [
    {
      label: '추천하기',
      onClick: (book: Book) => {
        // 책 이야기 페이지로 이동
        navigate(`/${prefix}/${book.id}/EditPage`)
      },
      className: 'bg-[var(--button-brown,#A6917E)] text-white',
    },
    
  ]

  return (
    <div className="flex h-screen p-6">
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
