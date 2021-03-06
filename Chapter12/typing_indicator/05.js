import React from "react";

const Chat = props => {
  const [value, setValue] = React.useState("");

  const id = React.useRef(undefined);

  React.useEffect(() => {
    if (props.user.typing) {
      clearTimeout(id.current);

      id.current = setTimeout(() => {
        props.dispatch({
          type: "set_typing",

          payload: { name: props.user.name, typing: false }
        });
      }, 2000);
    } else if (value !== "") {
      props.dispatch({
        type: "set_typing",

        payload: { name: props.user.name, typing: true }
      });

      id.current = setTimeout(() => {
        props.dispatch({
          type: "set_typing",

          payload: { name: props.user.name, typing: false }
        });
      }, 2000);
    }
  }, [value]);

  const sendMessage = () => {
    if (value !== "") {
      props.dispatch({
        type: "create_message",
        payload: { user: props.user.name, message: value }
      });

      setValue("");
    }
  };

  return (
    <div>
      <div>{`welcome ${props.user.name}`}</div>
      {props.messages.map(message => (
        <div key={message.id}>
          {message.user === props.user.name ? "you: " : `${message.user}: `}
          {` `}
          {message.text}
        </div>
      ))}
      message:{" "}
      <input
        placeholder="type your message..."
        onChange={e => setValue(e.target.value)}
        value={value}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>send</button>
      {props.participant.typing && (
        <div>{`${props.participant.name} is typing`}</div>
      )}
    </div>
  );
};

const Messenger = () => {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "create_message":
          return {
            ...state,
            messages: [
              ...state.messages,
              {
                user: action.payload.user,
                text: action.payload.message,
                id: state.nextId
              }
            ],
            nextId: state.nextId + 1
          };
        case "set_typing":
          return {
            ...state,
            users: state.users.map(user => {
              if (user.name === action.payload.name) {
                return {
                  name: user.name,
                  typing: action.payload.typing
                };
              }

              return user;
            })
          };
        default:
          return state;
      }
    },
    {
      nextId: 0,
      messages: [],
      users: [{ name: "Jane", typing: false }, { name: "Joe", typing: false }]
    }
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Chat
        user={state.users.find(user => user.name === "Jane")}
        participant={state.users.find(user => user.name === "Joe")}
        messages={state.messages}
        dispatch={dispatch}
      />

      <Chat
        user={state.users.find(user => user.name === "Joe")}
        participant={state.users.find(user => user.name === "Jane")}
        messages={state.messages}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Messenger;
