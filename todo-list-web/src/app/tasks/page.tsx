"use client";

import { ModalTask } from "@/components/Task/ModalTask";
import { TaskList } from "@/components/Task/TaskList";
import { Task } from "@/schemas/task";
import { destroy, getTasks } from "@/services/task";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null)

  const openModal = () => {
    setTaskToUpdate(null)
    setShowModal(true)
  }

  const closeModal = async () => {
    setShowModal(false)
    setTaskToUpdate(null)
    await loadTasks()
  }

  const loadTasks = async () => {
    try {
      const tasks = await getTasks()
      console.log(tasks)

      setTasks(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  const destroyTask = async (id: string) => {
    try {
      await destroy(id)
      await loadTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTask = (task: Task) => {
    setTaskToUpdate(task)
    setShowModal(true)
  }

  useEffect(() => {
    (async () => {
      await loadTasks()
    })()
  }, [])

  
  return (
    <>
      <Typography variant="h3">
        My tasks
      </Typography>
      
      <Button onClick={openModal} variant="outlined">Create task</Button>

      <Stack sx={{
        mt: '25px'
      }} width={'60%'}>
        <TaskList
          tasks={tasks}
          handleDelete={destroyTask}
          handleUpdate={handleUpdateTask}
        />
      </Stack>

      <ModalTask
        open={showModal}
        task={taskToUpdate}
        handleClose={closeModal}
      />
    </>
  )
}