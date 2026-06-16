import { useNavigate } from "react-router";
import TaskFlo from "../assets/Taskflo.png";
export default function Profile({ data }) {
  const navigate = useNavigate();
  const { name, email, avatar } = data;
  return (
    <>
      <button
        className="flex items-center px-3 py-2 hover:bg-blue-800  rounded-lg transition-colors ml-2 "
        onClick={() => {
          console.log("log");
          navigate("/user");
        }}
      >
        <div className="text-right">
          <div className="text-sm font-medium truncate max-w-30 ">{name}</div>
          <div className="text-xs font-medium truncate max-w-30  ">{email}</div>
        </div>

        <div className="w-9 h-9 rounded-full border border-amber-200 shadow-md overflow-hidden ">
          <img src={avatar} alt={name} className="w-full h-full" />
        </div>
      </button>
    </>
  );
}
