import AppRoutes from "./routes/routes";
import '../src/styles/root.css'
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <Suspense fallback={<Loading isLoading={true} />}>
      <ErrorBoundary
        // FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <AppRoutes />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
