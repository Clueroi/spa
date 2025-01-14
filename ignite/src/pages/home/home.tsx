import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

export function Home() {


  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task:'',
      minutesAmount:5,
    }
  })

  function handleCreateNewCycle(data:NewCycleFormData){
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="De um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="projeto 1"></option>
            <option value="projeto 2"></option>
            <option value="projeto 3"></option>

          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {valueAsNumber:true})}
          />
          <span>minutos</span>
        </FormContainer>


        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled} > <Play size={24} /> Começar </StartCountdownButton>
      </form>

    </HomeContainer>
  )
}