import { AuthProvider } from "./AuthContext";
import { LangProvider } from "./LangContext";
import { LearnProvider } from "./LearnContext";
import { QuizProvider } from "./QuizContext";

function Provider({ children }) {
    return (
        <AuthProvider>
            <QuizProvider >
                <LearnProvider>
                    <LangProvider>{children}</LangProvider>
                </LearnProvider>
            </QuizProvider>
        </AuthProvider >
    );
}

export default Provider;
