import React, {useState} from 'react'

const CreatePostTag = (props) => {
    
    const [selected, setSelected] = useState(false)

    const mystyle1 = {
        "background-color": props.tag.color,
        "border": "2px solid "+ props.tag.color
    }
    const mystyle2 = {
        "border": "2px solid "+ props.tag.color
    }

    const onClack = () => {
        
        if(selected){
            setSelectedStyle(mystyle2);
        }else{
            setSelectedStyle(mystyle1);
        }
        setSelected(!selected);
    }

    const [selectedStyle, setSelectedStyle] = useState(mystyle2);
    return (
        <div className=''>
            <button onClick={onClack} style={selectedStyle} type="button" className={` px-2 py-1 inline-flex items-center text-sm font-medium text-center text-tprimary rounded-full hover:bg-baccent `}>
                {props.tag.name}
            </button>
        </div>

    )
}

export default CreatePostTag