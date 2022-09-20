import type { NextPage } from "next";
import Toasts from "../components/taosts/Toasts";

const Home: NextPage = () => {
  return (
    <div>
      <img src="/qr-code.svg" width="600px" />
      <Toasts />
    </div>
  );
};

export default Home;
