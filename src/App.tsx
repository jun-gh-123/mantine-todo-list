import React, { useState } from "react";

import {
  createTheme,
  MantineProvider,
  Title,
  AppShell,
  Container,
  Divider,
} from "@mantine/core";

import NewTask from "./components/NewTask";

import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function () {
  const [taskList, setTaskList] = useState([]);

  const addNewTask = (newTask: string) => {
    setTaskList([...taskList, newTask]);
  };

  return (
    <MantineProvider theme={theme}>
      <AppShell padding="md">
        <AppShell.Main>
          <Container>
            <Title order={1}>Mantine Todo List</Title>
            <Divider my="sm" />
            <NewTask addNewTask={addNewTask} />
            <Divider my="sm" />
            {taskList.map((t) => (
              <div>{t}</div>
            ))}
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
