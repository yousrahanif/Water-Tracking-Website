
import Dashboard from "../components/Dashboard";
import Main from "../components/Main";
import WaterAwareness from "../components/WaterAwareness";

export const metadata = {
    title: "Water Tracker · Dashboard",
  };

export default function DashboardPage(){

    return (
        <Main>
          <WaterAwareness></WaterAwareness>
          <Dashboard></Dashboard>
        </Main>
    )
}