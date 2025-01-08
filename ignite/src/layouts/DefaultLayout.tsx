import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaulLayout(){
  return (
    <>
      <div>
        <Header/>
        <Outlet/>
      </div>
    </>
  )
}