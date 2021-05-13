import React from 'react'

import Hero from '../components/sections/home/Hero'
import HomeLayout from '../components/layouts/HomeLayout'

export default function Home() {
  return (
    <HomeLayout>
      <Hero
        title="Guess a whoDat!"
        subtitle="Create a personalized 'Guess Who' deck within minutes that you can play with friends and family."
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="Create your deck now"
        ctaLink="/editor"
      />
    </HomeLayout>
  )
}
