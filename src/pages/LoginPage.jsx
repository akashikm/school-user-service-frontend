import LeftPanel from "./components/LeftPanel";
import Login from "./components/Login";
import Footer from "./components/Footer";

function LoginPage() {
  return (
    <div className="w-screen h-screen relative bg-gray-50">
      {/* Footer: bottom, full width */}
      <div className="fixed bottom-0 left-0 w-full min-h-[60px] bg-gray-200 z-10">
        <Footer />
      </div>

      {/* SidePanel: full width, positioned above Footer */}
      <div className="fixed bottom-[60px] left-0 w-full h-[calc(100%-60px)] bg-white z-0">
        <LeftPanel />

        {/* Login: small box inside SidePanel, positioned with margin */}
        <div className="absolute top-16 right-16 bottom-16 w-[500px] bg-white rounded-lg p-6">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
