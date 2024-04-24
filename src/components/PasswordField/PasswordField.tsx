import { useState } from "react";
import { TextField, TextFieldProps } from "../TextField/TextField";
import { IconButton, TextInput } from "react-native-paper";

export const PasswordField = (props: TextFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      right={
        <TextInput.Icon
          onPress={() => setVisible(!visible)}
          icon={visible ? "eye-off" : "eye"}
        />
      }
      secureTextEntry={!visible}
      label="Password"
      mode="outlined"
    />
  );
};
