import React from 'react'
import Header from '../../components/Header/Header'
import ArticleById from '../../components/Article/ArticleById'
import { useSelector } from 'react-redux';

export default function Article() {
  const user = useSelector((state) => state.persisted.user.user);

  return (
    <>
    <Header user={user}/>
    <div className="flex flex-col items-center justify-center p-6 space-y-2 ">
        <ArticleById  />
      </div>
    </>
  )
}
