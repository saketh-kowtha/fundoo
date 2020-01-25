
const user = (state = {}, action) => {
    switch(action.type) {
       case 'ADD_USER':
         return {...action.user};
     
      case 'UPDATE_IMAGE':
        return {...state, imageUrl: action.imgPath}
      
       default:
         return state;
    }
};

export default user
