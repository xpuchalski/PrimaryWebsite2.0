export const page = {
  path: "/GamesPage",
  title: "games",
  navLabel:  "games",
  order: 4
};

function GamesPage() {
  return (
    <section className="panel prose">
        <p><a href="https://rainraifu.itch.io/orange-jam">Orange Jam</a> is a game that I made for a classs --it201-- which, for me, acted as an avenue or an excuse to spend my time doing game design during my semester.</p>
        <iframe src="https://rainraifu.itch.io/orange-jam" height="600" width="600"></iframe>
    </section>
  );
}

export default GamesPage;
