import React from "react";
import { Stack, Text } from "@mantine/core";

import Task, { TaskType } from "./Task";

export default (props: {
  list: TaskType[];
  updateTask: (uuid: string, updated: TaskType) => void;
  deleteTask: (uuid: string) => void;
}) => {
  const { list, updateTask, deleteTask } = props;

  if (list.length === 0) {
    return <Text c="dimmed">There's nothing to do.</Text>;
  }

  return (
    <Stack gap="xs">
      {list.map((t) => (
        <Task
          key={t.uuid}
          task={t}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </Stack>
  );
};
