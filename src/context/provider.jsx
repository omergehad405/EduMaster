import { AuthProvider } from "./AuthContext";
import { LearnProvider } from "./LearnContext";
import { QuizProvider } from "./QuizContext";

function Provider({ children }) {
    return (
        <AuthProvider>
            <QuizProvider >
                <LearnProvider>
                    {children}
                </LearnProvider>
            </QuizProvider>
        </AuthProvider >
    );
}

export default Provider;
