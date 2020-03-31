const initialSate = {
  isWorking: false
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case "TEST_REDUCER":
      return { ...state, isWorking: true };
    default:
      return state;
  }
};
