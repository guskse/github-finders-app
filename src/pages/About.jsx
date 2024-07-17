function About() {
  return (
    <div>
      <h1 className="text-6xl mb-4">Github Finder</h1>
      <p className="mb-4 text-2xl font-light">
        About Us -
        <a href="https://www.udemy.com/course/modern-react-front-to-back/">
          React Project{" "}
        </a>
        Udemy course by
        <strong>
          <a href="https://traversymedia.com"> Brad Traversy</a>
        </strong>
        .
      </p>
      <p className="text-lg text-gray-400">
        Version <span className="text-white">1.0.0</span>
      </p>
      <p className="text-lg text-gray-400">
        Layout By: {""}
        <a
          className="text-white"
          href="https://github.com/guskse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gustavo Carvalho
        </a>
      </p>
    </div>
  );
}

export default About;
