/* eslint-disable react/no-array-index-key */
import React from 'react'
import IconCard from 'components/cards/IconCard'
import GlideComponent from 'components/carousel/GlideComponent'

export default ({ data, className = 'icon-cards-row' }) =>
  <div className={className}>
    <GlideComponent
      settings={{
        gap: 5,
        perView: 4,
        type: 'carousel',
        breakpoints: {
          320: { perView: 1 },
          576: { perView: 2 },
          1600: { perView: 3 },
          1800: { perView: 4 },
        },
        hideNav: true
      }}>
      {data.map((item, index) =>
        <div key={index}>
          <IconCard {...item} className="mb-4" />
        </div>)}
    </GlideComponent>
  </div>
