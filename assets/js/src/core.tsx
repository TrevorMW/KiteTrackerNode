import { createRoot } from "react-dom/client";
import App from "../../../client/app/App";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element #root not found");
}

createRoot(root).render(<App />);