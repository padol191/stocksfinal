import React from 'react'
import { useParams } from 'react-router'
export default function Stock() {
    const {ticker} = useParams()
  return (
    <div>{ticker}</div>
  )
}
