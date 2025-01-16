import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const StartCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding:1rem;
  border-radius: 8px;
  
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${props => props.theme["yellow-500"]};
  color: ${props => props.theme["gray-800"]};
  transition: 0.2s;


  &:not(:disabled):hover{
    transition: 0.2s;
    background:${props => props.theme["yellow-700"]};
  }

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`
export const StopCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding:1rem;
  border-radius: 8px;
  
  align-items: center;
  display: flex;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${props => props.theme["red-500"]};
  color: ${props => props.theme["gray-800"]};
  transition: 0.2s;


  &:not(:disabled):hover{
    transition: 0.2s;
    background:${props => props.theme["yellow-700"]};
  }

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }
`