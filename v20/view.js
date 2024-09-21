function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  messages,
  writtenMessage,
  sendMessage
} = window.Model;
const {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext
} = React;
const {
  createRoot
} = ReactDOM;
const Message = ({
  side,
  message,
  date,
  sender
}) => {
  const getTime = date => {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const valueParts = parts.map(e => e.value);
    return valueParts.join('');
  };
  const bgColor = side === 'left' ? 'text-bg-success' : '';
  return /*#__PURE__*/React.createElement("div", {
    className: "toast show m-1",
    role: "alert"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'toast-header ' + bgColor
  }, /*#__PURE__*/React.createElement("strong", {
    className: "me-auto"
  }, sender), /*#__PURE__*/React.createElement("small", null, getTime(date))), /*#__PURE__*/React.createElement("div", {
    className: 'toast-body ' + bgColor
  }, message));
};
const MessageContainer = ({
  side,
  ...rest
}) => {
  const justifyAt = side === 'left' ? 'start' : 'end';
  return /*#__PURE__*/React.createElement("div", {
    className: 'd-flex flex-row m-1 justify-content-' + justifyAt
  }, /*#__PURE__*/React.createElement(Message, _extends({
    side: side
  }, rest)));
};
const MessagesListBox = ({
  messages
}) => {
  const containerRef = useRef();
  useEffect(() => {
    containerRef.current.scroll(0, containerRef.current.scrollHeight);
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "flex-fill overflow-auto"
  }, messages.map((m, i) => /*#__PURE__*/React.createElement(MessageContainer, {
    key: i,
    side: m.sender === 'Alice' ? 'left' : 'right',
    sender: m.sender,
    date: m.date,
    message: m.message
  })));
};
const SendMessageBox = ({
  onMessageSend
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef();
  const handleActionForSending = () => {
    setText('');
    onMessageSend(inputRef.current.value);
  };
  const handleChange = () => {
    setText(inputRef.current.value);
  };
  const handleTextChanged = ev => {
    if (ev.keyCode === 13) {
      handleActionForSending();
    }
  };
  const handleButtonClicked = () => {
    handleActionForSending();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "input-group mb-3"
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: "form-control",
    type: "text",
    placeholder: "Escribe tu mensaje aqu\xED",
    value: text,
    onChange: handleChange,
    onKeyUp: handleTextChanged
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    type: "button",
    onClick: handleButtonClicked
  }, "Enviar"));
};
const App = () => {
  const {
    ctxMessages,
    ctxSendMessage
  } = useContext(ModelContext);
  return /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex flex-column p-2"
  }, /*#__PURE__*/React.createElement(MessagesListBox, {
    messages: ctxMessages
  }), /*#__PURE__*/React.createElement(SendMessageBox, {
    onMessageSend: ctxSendMessage
  }));
};
const ModelContext = createContext({
    ctxMessages: messages,
    ctxSendMessage: () => {}
});
const ModelContextProvider = ({
  children
}) => {
  const [ctxMessages, setCtxMessages] = useState([...messages]);
  const ctxSendMessage = msg => {
    writtenMessage.contents = msg;
    sendMessage();
    setCtxMessages([...messages]);
  };
  useEffect(() => {
    messages.onChange(() => {
      setCtxMessages([...messages]);
    });
    return () => messages.clearListeners();
  });
  return /*#__PURE__*/React.createElement(ModelContext.Provider, {
    value: {
      ctxMessages,
      ctxSendMessage
    }
  }, children);
};
createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ModelContextProvider, null, /*#__PURE__*/React.createElement(App, null)));
