export const page = {
  path: "/about-me",
  title: "about me",
  navLabel: "about me", // optional, defaults to title
  order: 5,              // optional, lower number = earlier in nav
  showInNav: true        // optional, set false to hide from nav
};

function AboutMePage() {
  return (
    <section className="panel prose">
      <h1>About Me</h1>
      <p>My name is Xander Puchalski, I pride myself on my ability and drive to pick up new skills to improve myself and contribute to projects I am passionate about.</p>
      <p>My main focus is software development, but I have a wide variety of interests and am always looking to learn new things. Some of my hobbies include :</p>
      <p>software development</p>
      <ul>
        <li>web development : the website you're on right now is a project of mine, something for me to go onto and showcase my skills, and look upon later and change it to see how i've grown.</li>
        <li>game development : I have a passion for games and have been making them for a while, it's something I've always enjoyed throughout my life. I read a quote once that says "Game design is  considered the ultimate practice because it requires mastering the intersection of psychology, art, technology, and systems thinking to craft engaging experiences"</li>
        <li>AI : I don't consider myself a 100% AI supporter or rejecter, I think I'm somewhere in the middle. I believe that as it stands right now, AI is a powerful tool that can be used for both good and bad purposes, and it's important to approach it with caution and responsibility. I have multiple papers on AI useage and proper usage philisophy, though my opinion on the topic is still evolving.</li>
      </ul>
      <p>gaming</p>
      <ul>
        <li>I used to be top 100 in the world in a number of games, the list includes Risk of Rain 2, Omega Strikers, Phantom forces, and top 1000 in Overwatch</li>
        <li>Currently I am working towards competing in a fighing game called Guilty Gear Strive</li>
      </ul>
      <p>writing</p>
      <ul>
        <li>I have a passion for writing, and have been writing for a while. I have a book published on Amazon called "Kilnfire" which I wrote during NaNoWriMo 2025, and I am currently writing a story to accompany my board game. Next year, for NaNoWriMo, I'll be taking it even more seriously.</li>
        <li>Another passion of mine is absorbing and sharing knowledge, this drive pushes me to write papers on topics I feel qualified to share my opinion on, such as ethical AI usage.</li>
        <li>Part of my love for logging my knowledge and my experiences bleeds over into video creation, <a href="https://www.youtube.com/@RainRaifu">my youtube page</a> is a testament to this</li>
      </ul>
      <p>cooking</p>
      <ul>
        <li>I am known around my area as a compitent baker, during schooltime I would hand out cookies to recieve feedback in order to improve my recipies.</li>
        <li>Currently I am working with another friend of mine who also has a passion for the culinary arts to make a cookbook with all of my recipies.</li>
      </ul>
      <p>fabrication</p>
      <ul>
        <li>woodworking ; I enjoy not having to pay money for furniture and other items, this drives me to create my own pieces.</li>
        <li>sewing ; something that always frustrated me was that the characters I like in media are often very niche, this angers me, because it is impossible to find merchendise for them. So, I make plushies of my and and other people's favorite characters. I sometimes sell my custom made plushies for $80.</li>
        <li>I also know an order of other fabrication techniques that help my physical projects be the best they can be.</li>
      </ul>
      <p></p>
      <ul>
        <li></li>
      </ul>
    </section>
  );
}

export default AboutMePage;