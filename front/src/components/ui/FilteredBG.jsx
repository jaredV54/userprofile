import React from 'react'

export const FilteredBG = ({ optionNo }) => {
  return (
    <div className='filtered_background'>
        <div className='hero'>
            <div className='overlay'></div>
        </div>
        <div className='blobs'>
            <div className='blob1'></div>
            <div className='blob2'></div>
            <div className='blob3'></div>
        </div>
      {optionNo === 1 ? 
        <LoginBg/> : <RegisterBg/>
      }
    </div>
  )
}

const LoginBg = () => {
  return (
    <>
    <div className='miniBx1_container'>
      <div className='min1_1'></div>
      <div className='min1_2'></div>
      </div>
      <div className='miniBx2_container'>
        <div className='min1_1'></div>
        <div className='min1_2'></div>
      </div>

      <div className='outline'>
        <div className='bx1'></div>
        <div className='bx2'></div>
        <div className='bx3'></div>
        <div className='bx4'></div>
      </div>
    </>
  )
}

const RegisterBg = () => {
  return (
    <>
      <div></div>
    </>
  )
}