export const page = {
  path: "/",
  title: "index",
  navLabel: "> index",
  order: 1
};

function HomePage() {
  return (
    <section className="panel prose">
      <h1>Home</h1>
      <p>Welcome to my personal website! This is the home page.</p>
    </section>
  );
}

export default HomePage;
