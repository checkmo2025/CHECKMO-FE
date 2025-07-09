const AuthLeftPanel = () => {
  return (
    <div
      className="w-2/5 flex flex-col justify-center items-center text-white"
      style={{ backgroundColor: "#90D26D" }}
    >
      <img
        src="/book-logo.png"
        alt="책모 로고"
        className="w-70 mb-6"
      />
      <h1 className="mt-5 text-2xl font-bold">독서의 처음부터 모임의 끝까지!</h1>
      <p className="mt-5 text-7xl font-extrabold">책모</p>
    </div>
  );
};

export default AuthLeftPanel;
