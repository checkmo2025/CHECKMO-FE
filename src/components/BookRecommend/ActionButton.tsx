interface ActionButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const ActionButton = ({ onClick, label, className }: ActionButtonProps) => {
  const defaultClassName =
    "px-7.5 py-2.5 bg-[#A6917D] text-white text-xs rounded-3xl hover:bg-[#90D26D] transition";

  return (
    <button onClick={onClick} className={className || defaultClassName}>
      {label}
    </button>
  );
};

export default ActionButton;
