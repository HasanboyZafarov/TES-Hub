import moment from "moment";
import type certificatesEarned from "./../../types/certificatesEarned";
const Certificate = ({ date, title, url }: certificatesEarned) => {
  return (
    <div className="flex gap-3 items-center bg-[#F2F4F2] p-3 w-full rounded">
      <img src={url} alt="" className="w-15 h-15 border-2 border-[#C1C8C2]" />
      <div>
        <h3 className="text-[#012D1D] text-sm font-semibold">{title}</h3>
        <p className="text-[#414844] text-xs">
          Issued: {moment(date).format("LL")}
        </p>
      </div>
    </div>
  );
};

export default Certificate;
