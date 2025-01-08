import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";

import { LayoutContainer } from "./styles";

export function DefaulLayout(){
  return (
    <>
      <LayoutContainer>
        <Header/>
        <Outlet/>
      </LayoutContainer>
    </>
  )
}