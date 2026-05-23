import { useEffect } from "react";
import "../App.css";
import { Button } from "../components/ui/button";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <Button variant={"default"}>Hello World</Button>
    </>
  );
}

export default App;
