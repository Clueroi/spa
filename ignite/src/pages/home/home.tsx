import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { NewCycleForm } from "./components/newCycleForm";
import { Countdown } from "./components/countdown";
import { CyclesContext } from "../../context/cyclesContext";

const NewCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

// Criando contexto para compartilhamento de propriedades

// INICIO HOME PAGE
export function Home() {

  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data:NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="submit" > <HandPalm size={24} /> Parar </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled} > <Play size={24} /> Começar </StartCountdownButton>
        )
        }

      </form>

    </HomeContainer >
  )
}