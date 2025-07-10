import React from 'react';

export interface NotificationItemProps {
  message: string;
  date: string;
  read?: boolean;
}

export function NotificationItem({
  message,
  date,
  read = false,
}: NotificationItemProps): React.ReactElement {
  return (
    <li className="flex items-start justify-between">
      <div className="flex flex-col">
        <span className="
          font-pretendard
          font-medium
          text-[14px]
          leading-[145%]
          tracking-[-0.1%]
          text-[#000000]
          py-[5px]
        ">{message}</span>
        <span className="
          font-pretendard
          font-normal
          text-[12px]
          leading-[145%]
          tracking-[-0.1%]
          text-[#000000]
        ">{date}</span>
      </div>
      <span
        className={`w-[15px] h-[15px] rounded-full ${
          read ? 'bg-gray-300' : 'bg-[#90D26D]'
        }`}
      />
    </li>
  );
}
