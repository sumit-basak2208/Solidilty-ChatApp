import "../styles/globals.css";

//  INTERNAL IMPORTS
import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from "../components";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <ChatAppProvider>
      <NavBar />
      <Component {...pageProps} />
    </ChatAppProvider>
  </div>
);

export default MyApp;
