import type Session from "@/types/session";
import { Clock4, MapPin, UsersRound, Video } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props {
  sessions: Session;
}

const SessionCard = ({ sessions: s }: Props) => {
  const navigate = useNavigate();
  const month = moment(s.startsAt).format("MMM").toUpperCase();
  const day = moment(s.startsAt).format("DD");
  const startsAt = moment(s.startsAt).format("HH:mm");
  const endsAt = moment(s.endsAt).format("HH:mm");

  const percent = (s.registeredCount / s.capacity) * 100;

  const isAlmostFull = percent >= 85;

  return (
    <div
      className="bg-[#F8FAF8] border border-[#C1C8C2] rounded-lg p-8 cursor-pointer hover:shadow-lg transition-all delay-0 duration-200"
      onClick={() => navigate(`/sessions/${s.id}`)}
    >
      <header className="flex items-start justify-between">
        <div className="bg-[#ECEEEC] flex flex-col items-center rounded-xs p-2 w-15 h-15">
          <p className="text-[#414844] font-bold text-xs">{month}</p>
          <p className="text-[#012D1D] font-bold text-xl">{day}</p>
        </div>
        {s.format === "online" ? (
          <div className="text-[#267320] p-1 px-2 text-xs flex items-center gap-1 bg-[#a5f7924d] rounded-xs">
            <Video size={17} /> Online
          </div>
        ) : (
          <div className="text-[#012D1D] p-1 px-2 text-xs flex items-center gap-1 bg-[#1b43321a] rounded-xs">
            <UsersRound size={17} /> Offline
          </div>
        )}
      </header>
      <p className="text-[#191C1B] mt-5">{s.title}</p>

      <div className="flex items-center gap-2 text-sm text-[#414844] mt-5">
        <Clock4 size={18} />
        <div className="flex items-center gap-2">
          <p>{startsAt}</p>
          <p>-</p>
          <p>{endsAt}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#414844] mt-2">
        <MapPin size={18} />
        <p>
          {s.region?.oblast} {s.region?.raion && "," + s.region.oblast}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#414844]">Capacity</p>
          <p
            className={`text-xs ${isAlmostFull ? "text-[#F48C24]" : "text-[#012D1D]"} font-bold`}
          >
            {s.registeredCount + "/" + s.capacity} spots{" "}
            {isAlmostFull && "(Almost Full)"}
          </p>
        </div>
        <div className="w-full rounded-xl bg-[#ECEEEC] overflow-hidden h-3 mt-2">
          <div
            className={`h-3 rounded-xl ${isAlmostFull ? "bg-[#F48C24]" : "bg-[#012D1D]"}`}
            style={{ width: percent + "%" }}
          ></div>
        </div>
        <button className="w-full bg-[#E6E9E7] text-[#191C1B] p-3 text-base mt-8 cursor-pointer">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
