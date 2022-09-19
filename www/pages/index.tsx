import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <p>Scan me</p>

      <img src="/qr-code.svg" width="600px" />
    </div>
  );
};

export default Home;
