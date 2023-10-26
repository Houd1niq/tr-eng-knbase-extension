import "./App.css";
import { userApiSlice } from "../entities/User";
import { AddTask } from "../features/addTask/ui/AddTask.tsx";

function App() {
  const { data, isSuccess, isError, isLoading } =
    userApiSlice.useGetUserInfoQuery();
  console.log(data);

  return (
    <div className="bg-bg-dark text-main-white p-4">
      <h1 className="text-xl text-main-purple mb-2">TR-Eng Knowledge Base</h1>
      {isLoading && <h3 className="text-xl text-main-purple">Loading...</h3>}
      {isError && <div>Необходима авторизация на сайте</div>}
      {isSuccess && data && data.role === "teacher" && (
        <div>База знаний доступна только ученикам</div>
      )}
      {isSuccess && data && data.role === "student" && (
        <div>
          <h2>Добрый день, {data.name}</h2>
          <AddTask />
        </div>
      )}
    </div>
  );
}

export default App;
