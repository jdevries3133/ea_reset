import { Outlet } from "remix";
import { Card } from "~/components/card";

import fightUrl from "~/static/fight.jpg";
import angerUrl from "~/static/anger.jpg";

export default function WhatsHappening() {
  return (
    <>
      <h1>What is happening?</h1>
      <div className="flex flex-row md:m-6">
        <Card title="fight" imageUrl={fightUrl} />
        <Card title="emotional outburst" imageUrl={angerUrl} />
      </div>
      <Outlet />
    </>
  );
}
