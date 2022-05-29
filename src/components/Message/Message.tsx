import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Message as IMessage } from "../../store/message/message.types";
import { IReduxState } from "../../store/store.types";
import userSelectors from "../../store/user/user.selectors";


const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
      user: userSelectors.userStateSelector(state)
    }),
    {}
  );

export interface IProps {
    message : IMessage
}

const Message: React.FC<ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {
    
    const myUserId = props.user.userId === props.message.senderId

  return (
    <View style={[styles.container, myUserId ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{ color: "#fefefe" }}> {props.message.content} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 12,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  leftContainer: {
    backgroundColor: "#234a9d",
    marginLeft: 10,
    marginRight: 'auto'
  },
  rightContainer: {
    backgroundColor: "#222",
    marginLeft: 'auto',
    marginRight: 10
  },
});

export default connectStateAndDispatch(Message);
