import { json } from 'body-parser';
import React from 'react';
import { useEffect, useState } from 'react';

// export const Hello = () => {
//     const [initialState, setInitialState] = useState([])
    
//     useEffect(()=>{
//         fetch('/api').then(res => {
//             if(res.ok){
//                 return res.json()
//             }
//         }).then(jsonResponse => setInitialState(jsonResponse.hello))
//     }, [])

//     return(<div>
//         {initialState.length > 0 && initialState.map((e,i)=> <li key={i}>{e}</li>)}
//     </div>
//     )
// }


