interface Props {
  label: string;
  value: string;
  setValue: (title: string) => void;
  placeholder: string;
}

const Title = ({ label, value, setValue, placeholder }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="village" className="text-[#191C1B] text-sm font-semibold">
        {label}
      </label>
      <input
        id="village"
        type="text"
        value={value}
        className="p-3 py-2 outline-none border-2 mt-2 bg-white border-[#717973] rounded-xs"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Title;
