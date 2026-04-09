const initialState = {
    nombreUsuario: "",
    telefonoUsuario:""
}

export const dataUsuarioReducer = (state = initialState, action) =>{

    switch(action.type){
        case "SET_USUARIO":
            return {
                ...state,
                nombreUsuario: action.payload.nombreUsuario,
                telefonoUsuario: action.payload.telefonoUsuario
            };
        
        case "CLEAR_USUARIO":
            return {
                ...state,
                nombreUsuario:"",
                telefonoUsuario:""
            };

        default:
            return state;
    }

}