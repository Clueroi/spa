import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>


export function NewCycleForm(){

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(NewCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 5,
      }
    })
    

  return (
    <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            disabled={!!activeCycle}
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
            min={1}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer>
  )
}