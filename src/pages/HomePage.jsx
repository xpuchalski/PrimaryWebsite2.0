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
      <p>Welcome to my personal website. This is the second public iteration of my ongoing quest to capture my programming proficiency, thoughts, skills, and accomplishments. I started doing this in order to act as an internet time capsule, so that I can go back and see what i was doing at the time, one day.</p>
    </section>
  );
}

export default HomePage;
