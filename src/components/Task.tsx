import React from "react";
import { Checkbox, CloseButton, Group, Text } from "@mantine/core";
import { DateTime as LuxonDateTime } from "luxon";

export type TaskType = {
  uuid: string;
  createdAt: number;
  name: string;
  completed: boolean;
};

export default (props: {
  task: TaskType;
  updateTask: (uuid: string, updated: TaskType) => void;
  deleteTask: (uuid: string) => void;
}) => {
  const { task, updateTask, deleteTask } = props;

  const ldt = LuxonDateTime.fromMillis(task.createdAt);

  const textDecoration = task.completed ? "line-through" : "";

  return (
    <Group>
      <CloseButton onClick={() => deleteTask(task.uuid)} />
      <Checkbox
        checked={task.completed}
        onChange={() => {
          updateTask(task.uuid, { ...task, completed: !task.completed });
        }}
      />
      <Text size="xs" c="dimmed" td={textDecoration}>
        {ldt.toFormat("F")}
      </Text>
      <Text fw={700} td={textDecoration}>
        {task.name}
      </Text>
    </Group>
  );
};
