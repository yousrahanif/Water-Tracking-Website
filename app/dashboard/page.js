
import Dashboard from "../components/Dashboard";
import Main from "../components/Main";


export const metadata = {
    title: "Water Tracker · Dashboard",
  };

export default function DashboardPage(){

    return (
        <Main>
          <Dashboard></Dashboard>
        </Main>
    )
}