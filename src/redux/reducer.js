//Reducer ใช้สำหรับจัดการสถานะผู้ใช้
const initialState = {
    loading: false,
    currentUser: null,
    error: null,
};

const useReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default useReducer;
   