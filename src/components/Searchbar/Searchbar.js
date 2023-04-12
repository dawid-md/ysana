import { useRef } from "react"

export default function Searchbar(props){
    const inputRef = useRef(null)

    function search(searchterm){
        props.onSearch(searchterm)
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
            onKeyDown={onKeyDownHandler}  
            onChange={(e) => props.onSearch(e.target.value)}
            type="text"
            placeholder='Search...' />
        </div>
)
}