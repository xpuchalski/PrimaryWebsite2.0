export const page = {
  path: "/kilnfire",
  title: "Kilnfire",
  navLabel: "Kilnfire",
  order: 3
};

function KilnfirePage() {
  return (
    <section className="panel prose">
      <h1>Kilnfire</h1>
      <p>National Novel Writing Month (NaNoWriMo), is a yearly event where participants attempt to write a 50,000-word novel during the month of November. The old NaNoWriMo was shut down for accepting AI work, which entirely goes against the mission statement of the event, but as of this year (2026) a new board has taken on the mantle under the name <a href="https://nanowrimo2.com/" target="blank">NaNoWriMo 2.0</a> </p>
      <p>Last year, even though NaNoWriMo was shut down, I participated in spirit, writing my book called <a href="https://www.amazon.com/Kilnfire-X-Alexander-Puchalski/dp/B0G5G427TT">"Kilnfire"</a></p>
      <iframe src="https://www.amazon.com/Kilnfire-X-Alexander-Puchalski/dp/B0G5G427TT" height="600" width="600"></iframe>
    </section>
  );
}

export default KilnfirePage;
