import { Task, taskSchema } from "@/schemas/task"
import { getUser } from "@/services/auth"
import { create, update } from "@/services/task"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Modal, Stack, Switch, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { format } from "date-fns"
import { useState } from "react"
import { Controller, FieldErrors, useForm } from "react-hook-form"

type ModalTaskProps = {
  task: Task | null
  open: boolean
  handleClose: () => void
}

export const ModalTask = (props: ModalTaskProps) => {
  const {
    task,
    open,
    handleClose
  } = props

  const [error, setError] = useState<string | null>(null)

  const userId = getUser()?.id

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors }
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      userId,
    },
    values: task ?? undefined
  })

  const onSubmit = async (data: Task) => {
    setError(null)
    try {
      let response
      if (data.id) {
        response = await update(data)
      } else {
        response = await create(data)
      }
      
      console.log(response)
      
      reset()
      handleClose()
    } catch (error) {
      setError(error.message)
    }
  }

  const onError = (error: FieldErrors<Task>) => console.error(error)

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset()
        handleClose()
      }}
    >
      <DialogTitle>{task && task.id ? 'Edit' : 'Create'} Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
      <DialogContent>
        <Container>
          
            <Stack spacing={4}>
              {
                error ? (
                  <Alert severity="error">{error}</Alert>
                ) : ''
              }

              <TextField
                label="Description"
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <Controller
                name="isDone"
                control={control}
                render={({ field: { onChange, value }}) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange} />} label="Done"
                  />
                )}
              />
              

              <Controller
                name="deadline"
                control={control}
                render={({ field: { onChange, value }}) => (
                  <DatePicker
                    format="dd/MM/yyyy" 
                    value={value ? new Date(value) : null}
                    onChange={(event) => {
                      onChange(event)
                    }}
                  />
                )}
              />
            </Stack>
          
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          reset()
          handleClose()
        }}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
      </form>
      
    </Dialog>
  )
}