import React, { useState } from "react";

import { Title, TextInput, Group, Button } from "@mantine/core";

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const randomTasks = [
  "Buy a car",
  "Go shopping",
  "Run 30 minutes",
  "Call an old friend",
  "Laundry",
  "Take a nap",
  "Clean room",
  "Do the dishes",
];

export default (props: { addNewTask: (value: string) => void }) => {
  const { addNewTask } = props;
  const [text, setText] = useState("");
  const [phId, setPhId] = useState(
    getRandomIntInclusive(0, randomTasks.length - 1)
  );

  const onAdd = () => {
    if (!text) {
      return;
    }
    addNewTask(text);
    setText("");
    setPhId(getRandomIntInclusive(0, randomTasks.length - 1));
  };

  return (
    <Group>
      <Title order={4}>Create New Task</Title>
      <TextInput
        placeholder={randomTasks[phId]}
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
