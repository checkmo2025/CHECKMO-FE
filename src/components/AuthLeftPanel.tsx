const AuthLeftPanel = () => {
  return (
    <div
      className="hidden xl:flex flex-col justify-center items-center text-white p-6"
      style={{ 
        backgroundColor: "#90D26D",
        width: "450px",
        minHeight: "100vh"
      }}
    >
      <img
        src="/assets/book-logo.png"
        alt="책모 로고"
        className="w-60 max-w-full h-auto mb-2"
      />
    </div>
  );
};

export default AuthLeftPanel;
