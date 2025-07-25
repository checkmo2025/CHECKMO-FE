// src/pages/TestPage.tsx

import { useParams } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p className="mt-4 text-lg">
        현재 독서모임 ID는:{" "}
        <span className="font-semibold text-green-700">{id}</span>
      </p>
      <p className="mt-2 text-gray-600">
        이 페이지는 Sidebar가 ID에 따라 동적으로 잘 작동하는지 확인하기 위한
        테스트용입니다.
      </p>
    </div>
  );
}
