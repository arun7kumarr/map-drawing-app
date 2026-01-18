import Header from "./components/Header";
import MapView from "./components/MapView";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header />
      <div style={{ height: "calc(100vh - 60px)" }}>
        <MapView />
      </div>
    </div>
  );
}

export default App;
