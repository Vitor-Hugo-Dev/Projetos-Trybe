// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const SET_EXPENSE = 'SET_EXPENSE';
const SET_CURRENCIES = 'SET_CURRENCIES';
const SET_IDCONTROL = 'SET_IDCONTROL';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const initialState = { currencies: [], expenses: [], idControl: 0 };

const reducerWallet = (state = initialState, action) => {
  switch (action.type) {
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case SET_IDCONTROL:
    return {
      ...state,
      idControl: state.idControl + 1,
    };
  default:
    return state;
  }
};

export default reducerWallet;
