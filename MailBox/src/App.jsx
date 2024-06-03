import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import MainNavigation from "./components/Layout/MainNavigation";
import Compose from "./components/Mailcomponents/Compose";
import Inbox from "./components/Mailcomponents/Inbox/Inbox";
import Sent from "./components/Mailcomponents/SendBox/Sent"

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-7xl text-center font-serif">MailBox Client</h1>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path='/mainnavigation' element={<MainNavigation/>}/>
            <Route path='/compose' element={<Compose/>}></Route>
            <Route path='/inbox' element={<Inbox/>}></Route>
            <Route path='/sent' element={<Sent/>}></Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;
