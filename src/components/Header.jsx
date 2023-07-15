import React from 'react'

const Header = ({ score, bestScore }) => {
    return (
        <header>
            <div className="px-4 py-2 md:container mx-auto  font-mono flex justify-between items-center md:px-0 md:py-4">
                <h1 className='text-violet-500 font-extrabold text-4xl subpixel-antialiased'>Latir</h1>
                <div className='flex  gap-x-4 md:flex-col'>
                    <p className='text-violet-500 text-xl md:text-2xl z-30'>Score <span className='text-white'>{score}</span></p>
                    <p className='text-violet-500 text-xl md:text-2xl '>BestScore <span className='text-white'>{bestScore}</span></p>
                </div>
            </div>
        </header>
    )
}

export default Header