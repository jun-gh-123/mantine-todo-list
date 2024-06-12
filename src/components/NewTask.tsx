import React, { useState } from "react";

import { Title, TextInput, Group, Button } from "@mantine/core";

export default (props: { addNewTask: (value: string) => void }) => {
  const { addNewTask } = props;
  const [text, setText] = useState("");

  const onAdd = () => {
    addNewTask(text);
    setText("");
  };

  return (
    <Group>
      <Title order={4}>New Task</Title>
      <TextInput
        placeholder="Build a house"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <Button onClick={onAdd}>Add</Button>
    </Group>
  );
};
