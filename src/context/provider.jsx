import { AuthProvider } from "./AuthContext";
import { LearnProvider } from "./LearnContext";

function Provider({ children }) {
    return (
        <AuthProvider>
            <LearnProvider> {children}</LearnProvider>

        </AuthProvider >
    );
}

export default Provider;
