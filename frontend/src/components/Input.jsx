export default function Input({
  type,
  className,
  placeholder,
  value,
  onChange,
  error
}) {
  return (
    <>
      <input
        type={type}
        className="w-full border border-gray-400 rounded-md
      placeholder-gray-300 mb-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="errors text-red-500 text-xs mb-2 ">{error}</div>
      )}
    </>
  );
}
