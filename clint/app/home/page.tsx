import Companydata from '@/components/company'
import NewsData from '@/components/news'
import React from 'react'

const Home = () => {
  return (
    <>
     <main className="pt-4">
        <Companydata />
       { <NewsData /> }
      </main>
    </>
  )
}

export default Home