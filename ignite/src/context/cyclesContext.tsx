import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  cycles: Cycle[]
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

// Componente para passar entre as entidades que receberão o contexto

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cycles, dispatch] = useReducer((state: Cycle[], action:any) => {

    if(action.type === 'ADD_NEW_CYCLE'){
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {

    dispatch({
      type:'MARK_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })

    // setCycles((state) => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, finishedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // })
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    // setCycles((state) => [...state, newCycle])
    dispatch({
      type:'ADD_NEW_CYCLE',
      payload:{
        newCycle
      }
    })

    setActiveCycleId(id)
    setAmountSecondsPassed(0)

  }

  function interruptCurrentCycle() {
    // setCycles((state) => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return { ...cycle, interruptedDate: new Date() }
    //   } else {
    //     return cycle
    //   }
    // }))

    dispatch({
      type:'INTERUPT_CURRENT_CYCLE',
      payload:{
        activeCycleId
      }
    })

    setActiveCycleId(null)
  }


  return (
    <CyclesContext.Provider value={{
      activeCycle,
      activeCycleId,
      amountSecondsPassed,
      markCurrentCycleAsFinished,
      setSecondsPassed,
      interruptCurrentCycle,
      createNewCycle,
      cycles
    }}>
      {children}
    </CyclesContext.Provider>
  )
}