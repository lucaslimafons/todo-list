import { Task } from "@/schemas/task"
import { Alert, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import { format } from "date-fns"

type TaskCardProps = {
  task: Task
  handleDelete: (id: string) => void
  handleUpdate: (task: Task) => void
}

export const TaskCard = (props: TaskCardProps) => {

  const {
    task,
    handleDelete,
    handleUpdate
  } = props
  
  return (
    <Card>
      <CardContent>
        <Stack
          sx={{
            mb: '10px'
          }}
          spacing={2}
        >
          {
            task.isDone ? (
              <Alert severity="success">Done!</Alert>
            ) : ''
          }

          <Typography variant="h5" gutterBottom>
            {task.description}
          </Typography>

          { task.deadline ?
            (
              <Typography variant="body1">
                Deadline: { format(new Date(task.deadline), 'dd/MM/yyyy') }
              </Typography>) : ''
          }
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleUpdate(task)}>Update</Button>

        <Button size="small" color="error" onClick={() => handleDelete(task.id!)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}