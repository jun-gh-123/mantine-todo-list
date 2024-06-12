import React, { useState } from "react";
import {
  useMantineTheme,
  Button,
  Checkbox,
  CloseButton,
  Group,
  Popover,
  Text,
} from "@mantine/core";
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

  const [showDeletePopover, setShowDeletePopover] = useState(false);

  const theme = useMantineTheme();

  const ldt = LuxonDateTime.fromMillis(task.createdAt);

  const textDecoration = task.completed ? "line-through" : "";

  const defaultStyle = {
    border: `1px solid ${theme.colors.gray[2]}`,
    borderRadius: 5,
    padding: 5,
  };

  const styleOverride = showDeletePopover
    ? { ...defaultStyle, background: theme.colors.yellow[2] }
    : defaultStyle;

  return (
    <Group style={styleOverride}>
      <Popover
        position="left"
        withArrow
        shadow="md"
        opened={showDeletePopover}
        onChange={setShowDeletePopover}
      >
        <Popover.Target>
          <CloseButton
            onClick={() => setShowDeletePopover(!showDeletePopover)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Text>Delete task?</Text>
          <Group justify="flex-end" gap="xs">
            <Button
              variant="default"
              size="compact-xs"
              onClick={() => setShowDeletePopover(false)}
            >
              No
            </Button>
            <Button size="compact-xs" onClick={() => deleteTask(task.uuid)}>
              Yes
            </Button>
          </Group>
        </Popover.Dropdown>
      </Popover>
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
