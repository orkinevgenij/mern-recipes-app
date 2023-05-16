import React from 'react'
import ContentLoader from 'react-content-loader'
export const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={500}
      height={444}
      viewBox='0 0 500 444'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
    >
      <rect x='9' y='29' rx='0' ry='0' width='1' height='2' />
      <rect x='3' y='-1' rx='10' ry='10' width='300' height='142' />
      <rect x='198' y='283' rx='0' ry='0' width='0' height='1' />
      <rect x='6' y='164' rx='5' ry='5' width='295' height='102' />
    </ContentLoader>
  )
}
