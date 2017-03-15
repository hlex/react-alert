const initialState = {
  open: false,
  type: 'DEFAULT', // DEFAULT, ERROR, WARNING, SUCCESS, SYSTEM_ERROR, LOADING
  trxId: '',
  processInstance: '',
  message: {
    th: '',
    en: '',
    technical: '',
  },
};

const ReactAlertMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_ALERT_MESSAGE': {
      return { ...state,
        open: true,
        type: action.message.type || action.typeMessage,
        trxId: action.message.trxId,
        processInstance: action.message.processInstance,
        message: action.message.message,
      };
    }
    case 'CLOSE_ALERT_MESSAGE': {
      return { ...state,
        open: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default ReactAlertMessageReducer;
