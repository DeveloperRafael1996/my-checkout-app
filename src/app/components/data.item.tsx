export function DataItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="text-xs text-gray-600">
      <span className="font-semibold text-[#430AFF]">{label}:</span>{" "}
      <span className="break-words">{value}</span>
    </div>
  );
}

export function DataItemAlternative({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <p className="text-xs text-gray-600">
      <span className="font-semibold text-[#430AFF]">{label}:</span> {value}
    </p>
  );
}
