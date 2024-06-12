import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  createTheme,
  MantineProvider,
  Title,
  AppShell,
  Container,
  Divider,
} from "@mantine/core";

import { TaskType } from "./components/Task";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";

import "@mantine/core/styles.css";

const exampleTaskUUID = uuidv4();

export default function () {
  const [tasks, setTasks] = useState<{
    [uuid: string]: TaskType;
  }>({
    [exampleTaskUUID]: {
      uuid: exampleTaskUUID,
      createdAt: Date.now(),
      name: "Add a new task.",
      completed: false,
    },
  });

  const taskList = useMemo(() => {
    const list = [];

    for (let key in tasks) {
      list.push(tasks[key]);
    }

    list.sort((a, b) => b.createdAt - a.createdAt);

    return list;
  }, [tasks]);

  const updateTask = (uuid: string, updated: TaskType) => {
    tasks[uuid] = { ...updated };
    setTasks({ ...tasks });
  };

  const deleteTask = (uuid: string) => {
    delete tasks[uuid];
    setTasks({ ...tasks });
  };

  const addNewTask = (newTaskName: string) => {
    let newTaskUUID = uuidv4();

    while (newTaskUUID in tasks) {
      newTaskUUID = uuidv4();
    }

    const newTask = {
      uuid: newTaskUUID,
      createdAt: Date.now(),
      name: newTaskName,
      completed: false,
    };

    setTasks({
      ...tasks,
      [newTaskUUID]: newTask,
    });
  };

  return (
    <MantineProvider>
      <AppShell padding="md">
        <AppShell.Main>
          <Container>
            <Title order={1}>Mantine Todo List</Title>
            <Divider my="sm" />
            <NewTask addNewTask={addNewTask} />
            <Divider my="sm" />
            <TaskList
              list={taskList}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
