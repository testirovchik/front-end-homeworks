

export const reducer = (state, {type, payload}) => {
    
    switch(type) {
        
        case "Update":
                return {...state, users: state.users.map(user => user.id == payload.id? payload: user)}

        case "Delete":
                return {...state, users: state.users.filter(user => user.id != payload)}

        case "Add":
            return {...state, users: [...state.users, payload]}

        case "SetUsers":
            return { ...state, users: payload }

        default: 
            return state;
    }
}