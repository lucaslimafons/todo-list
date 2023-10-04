import { Task } from "@/schemas/task"
import { TaskCard } from "./TaskCard"
import { Box, Container, Stack } from "@mui/material"

type TaskListProps = {
  tasks: Task[]
  handleDelete: (id: string) => void
  handleUpdate: (task: Task) => void
}

export const TaskList = (props: TaskListProps) => {
  const {
    tasks,
    handleDelete,
    handleUpdate
  } = props

  return (
    <>
      <Box>
        <Stack spacing={5}>
        {
          tasks.map((task) => {
            return <TaskCard task={task} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          })
        }
        </Stack>
      </Box>
    </>
  )
}