

export const sortArrayByObjKey = (direction, array, objKey) => {
    let copy = [...array]
  
    if(direction === 'desc'){
      copy = copy.sort((a, b) => { 
        if (typeof a[objKey] === 'string'){ return b[objKey] > a[objKey] ? -1 : 1 }
        else if(typeof a[objKey] === 'number'){ return b[objKey] - a[objKey]}
      } ) 
    }
    if(direction === 'asc'){
      copy = copy.sort((a, b) => { 
        if (typeof a[objKey] === 'string'){ return b[objKey] < a[objKey] ? -1 : 1 }
        else if(typeof a[objKey] === 'number'){ return a[objKey] - b[objKey] }
      } )
    }
    return copy
  }