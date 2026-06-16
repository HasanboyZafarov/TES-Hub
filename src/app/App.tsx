import { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/ui/button";

import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Input } from "../components/ui/input";

function App() {
  interface Users {
    id: string;
    name: string;
    lastName: string;
  }

  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    axios.get<Users[]>("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <Button variant={"default"}>Hello World</Button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} + {u.lastName}
          </li>
        ))}
      </ul>
      <Alert variant={"destructive"}>
        <AlertTitle>This is the alert</AlertTitle>
        <AlertDescription>Hello World</AlertDescription>
      </Alert>
    </>
  );
}

export default App;
