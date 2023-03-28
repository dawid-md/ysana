import { useEffect, useState, useRef } from "react"

export default function Searchbar(){
    const [term, setTerm] = useState('')
    const inputRef = useRef(null)

    function search(){
        console.log('wyszukiwanie');
    }

    const onKeyDownHandler = e => {
        if (e.key === 'Enter') {
            search()
        }
    }

    return(
        <div className='d-flex searchButton'>
            <input className='form-control search'
            ref={inputRef}
            value={term}
            onKeyDown={onKeyDownHandler}  
            onChange={e => setTerm(e.target.value)}
            type="text"
            placeholder='Search...' />
                {/* <button 
                    onClick={search} className="searchButton btn btn-sm">Szukaj
                </button> */}
        </div>
)
}