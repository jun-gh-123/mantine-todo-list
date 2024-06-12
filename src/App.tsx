import React, { useState, useMemo, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  createTheme,
  MantineProvider,
  Title,
  AppShell,
  Container,
  Divider,
  Group,
  ActionIcon,
  Tooltip,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconBrandGithub } from "@tabler/icons-react";

import { TaskType } from "./components/Task";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";

import "@mantine/core/styles.css";

enum SetupState {
  Preload = 1,
  Loaded,
  Ready,
}

function getDefaultTasks() {
  const exampleTaskUUID = uuidv4();

  return {
    [exampleTaskUUID]: {
      uuid: exampleTaskUUID,
      createdAt: Date.now(),
      name: "Create a new task.",
      completed: false,
    },
  };
}

export default function () {
  const [opened, { open, close }] = useDisclosure(false);
  const [setupState, setSetupState] = useState(SetupState.Preload);
  const [tasks, setTasks] = useState<{
    [uuid: string]: TaskType;
  }>(getDefaultTasks());

  useEffect(() => {
    const data = localStorage.getItem("todos");

    if (data) {
      setTasks(JSON.parse(data));
    }

    setSetupState(SetupState.Loaded);
  }, []);

  useEffect(() => {
    if (setupState !== SetupState.Ready) {
      return;
    }
    writeToFile();
  }, [tasks]);

  useEffect(() => {
    if (setupState === SetupState.Loaded) {
      setSetupState(SetupState.Ready);
    }
  }, [setupState]);

  const writeToFile = () => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  };

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

  const onGithubClick = () => {
    window.open("https://github.com", "_blank");
  };

  const onResetData = () => {
    localStorage.clear();
    setTasks(getDefaultTasks());
    setSetupState(SetupState.Loaded);
    close();
  };

  if (setupState !== SetupState.Ready) {
    return;
  }

  return (
    <MantineProvider>
      <Modal opened={opened} onClose={close} title="Reset Data?">
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            No
          </Button>
          <Button color="red" onClick={onResetData}>
            Yes
          </Button>
        </Group>
      </Modal>
      <AppShell header={{ height: 110 }} padding="md">
        <AppShell.Header>
          <Container style={{ paddingTop: 10 }}>
            <Group justify="space-between" style={{ paddingBottom: 5 }}>
              <Title order={1}>Mantine Todo List</Title>
              <Group>
                <Tooltip label="github repo">
                  <ActionIcon
                    variant="filled"
                    color="black"
                    onClick={onGithubClick}
                  >
                    <IconBrandGithub />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Reset data">
                  <ActionIcon variant="filled" color="red" onClick={open}>
                    <IconTrash />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <NewTask addNewTask={addNewTask} />
          </Container>
        </AppShell.Header>
        <AppShell.Main>
          <Container>
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
