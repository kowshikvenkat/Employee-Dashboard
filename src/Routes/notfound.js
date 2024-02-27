import React from 'react'
import oopsIMG from '../assets/oops.png'
function Notfound() {
  return (
    <div>
      <h1 className='text-warning'>PAGE NOT FOUND</h1>
      <br />
      <img loading={'lazy'} src={oopsIMG} style={{width:300,height:300}} alt="" />
    </div>
  )
}

export default Notfound
