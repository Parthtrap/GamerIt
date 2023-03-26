import React from 'react'

const Tags = (props) => {
    const mystyle = {
        "background-color": props.tag.color
    }
    return (
        <div className=''>
            <button style={mystyle} type="button" className={` px-2 py-1 inline-flex items-center text-sm font-medium text-center text-tprimary rounded-full hover:bg-baccent `}>
                {props.tag.name}
            </button>
        </div>

    )
}

export default Tags