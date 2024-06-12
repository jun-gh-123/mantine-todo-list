import React, { useState } from "react";

import { Title, TextInput, Group, Button } from "@mantine/core";

export default (props: { addNewTask: (value: string) => void }) => {
  const { addNewTask } = props;
  const [text, setText] = useState("");

  const onAdd = () => {
    if (!text) {
      return;
    }
    addNewTask(text);
    setText("");
  };

  return (
    <Group>
      <Title order={4}>Create New Task</Title>
      <TextInput
        placeholder="Build a house"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd();
          }
        }}
      />
      <Button onClick={onAdd}>Add</Button>
    </Group>
  );
};
