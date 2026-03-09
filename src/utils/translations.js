// translations.js

const translations = {
  en: {
    // Header section
    menuHome: "Home",
    menuHowItWorks: "How it Works",
    menuFeatures: "Features",
    menuPricing: "Pricing",
    menuAbout: "About",
    menuFAQ: "FAQ",
    menuLogin: "Login",
    menuSignUp: "Sign Up",
    menuLang: "Language",
    menuProfile: "Profile",
    menuLogout: "Logout",
    menuDashboard: "Dashboard",
    menuMyTracks: "My Tracks",
    menuMyQuizzes: "My Quizzes",
    menuMyXP: "My XP",
    menuMySettings: "Settings",
    menuClose: "Close",
    menuDarkMode: "Dark Mode",
    menuLightMode: "Light Mode",
    menuTheme: "Theme",
    menuBack: "Back",

    // --- LearnPage.jsx (9-16) ---
    learnPageTitle: "Learn",
    learnPageSubtitle: "Your Personalized Learning Dashboard",
    learnPageWelcome: "Welcome to your learning dashboard!",
    learnPageActiveTracks: "Active Tracks",
    learnPageFinishedTracks: "Finished Tracks",
    learnPageNoTracks: "You have no active learning tracks yet.",
    learnPageStartTrack: "Start a New Track",
    learnPageBrowseTracks: "Browse All Tracks",

    // --- Lesson.jsx (221-234) ---
    lessonPageTitle: "Lesson",
    lessonPageProgress: "Lesson Progress",
    lessonPageNextLesson: "Next Lesson",
    lessonPagePrevLesson: "Previous Lesson",
    lessonPageMarkComplete: "Mark as Complete",
    lessonPageCompleted: "Completed!",
    lessonPageNotStarted: "Not started",
    lessonPageContinue: "Continue Lesson",
    lessonPageStart: "Start Lesson",
    lessonPageResources: "Resources",
    lessonPageNotes: "Notes",
    lessonPageQuiz: "Lesson Quiz",
    lessonPageCongrats: "Congratulations! You've completed this lesson.",

    // Dashboard.jsx (40-43)
    dashboardWelcomeMessage: "Welcome back,",
    dashboardContinueLearning: "Continue Learning",
    dashboardStatsTitle: "Your Stats",
    dashboardStartNewTrack: "Start a New Track",

    // --- Learn Feature Components ---
    learnSearchPlaceholder: "search for courses, e.g. HTML",
    learnLoading: "Loading lesson...",
    lessonOpening: "Opening lesson...",
    lessonQuizUnlocked: "Great job! A new lesson is unlocked \uD83C\uDF89",
    lessonQuizCompleteError: "An error occurred. Please try again.",
    lessonImageAlt: "Lesson image",
    lessonQuizTitle: "Lesson Quiz",
    lessonQuizInProgress: "In progress",
    lessonQuizSubmit: "Submit quiz",
    lessonQuizAnswered: "You answered",
    lessonQuizOutOf: "out of",
    lessonQuizCorrectly: "questions correctly.",
    lessonQuizAllCorrect: "All answers are correct. Next lesson is unlocked \u2714",
    lessonQuizReviewTryAgain: "Correct answers are highlighted in green. Review them and try again.",
    lessonQuizTryAgain: "Try again",
    lessonsNoAvailable: "No lessons available.",
    trackFinalQuizTitle: "Final Track Quiz",
    trackFinalQuizDesc: "Test your knowledge on all lessons in this track.",
    trackFinalQuizBadge: "Track quiz",
    trackFinalQuizNotAnswered: "You did not answer this question.",
    trackFinalQuizSubmitBtn: "Submit final quiz",
    trackFinalQuizSubmitting: "Submitting...",
    trackFinalQuizPleaseAnswerAll: "Please answer all questions before submitting.",
    trackFinalQuizExcellent: "Excellent! Track marked as completed.",
    trackFinalQuizTryAgain: "Try final quiz again",
    trackFinalQuizIncompleteInfo: "Some answers are incorrect. Review and try again.",
    trackFinalQuizCongrats: "\uD83C\uDF89 Congratulations! Track marked as completed.",
    trackFinalQuizError: "Error while marking track as completed.",
    trackAboutTrack: "About this Track",
    trackVisualHighlights: "Visual Highlights",
    trackEnrollNow: "Enroll Now",
    trackEnrolledSuccess: "You have enrolled in this track!",

    // QuickActions.jsx (5-9)
    quickActionsTitle: "Quick Actions",
    quickActionsUploadNotes: "Upload Notes",
    quickActionsCreateQuiz: "Generate Quiz",
    quickActionsStartLearning: "Resume Course",
    quickActionsViewDashboard: "View Statistics",

    // Login.jsx translations (lines 113-121)
    loginTitle: "Log In",
    loginEmailLabel: "Email",
    loginEmailPlaceholder: "Email address...",
    loginPasswordLabel: "Password",
    loginPasswordPlaceholder: "Password...",
    loginButton: "Login",
    loginSignUp: "Sign up →",
    loginError: "Authentication error",

    // SignUp / Register translations
    signupTitle: "Sign Up",
    signupNameLabel: "Full Name",
    signupNamePlaceholder: "Your full name...",
    signupEmailLabel: "Email Address",
    signupEmailPlaceholder: "Enter your email...",
    signupPasswordLabel: "Password",
    signupPasswordPlaceholder: "Create a password...",
    signupConfirmPasswordLabel: "Confirm Password",
    signupConfirmPasswordPlaceholder: "Repeat your password...",
    signupButton: "Create Account",
    signupAlreadyMember: "Already have an account? Log in",
    signupTerms: "By signing up, you agree to our",
    signupTermsLink: "Terms of Service",
    signupAnd: "and",
    signupPrivacyLink: "Privacy Policy",
    signupSuccess: "Your account has been created! Please check your email to verify your account.",
    signupErrorRequired: "Please fill in all fields.",
    signupErrorPasswordMatch: "Passwords do not match.",
    signupErrorShortPassword: "Password must be at least 6 characters.",
    signupErrorInvalidEmail: "Please enter a valid email address.",
    signupError: "An error occurred. Please try again.",
    signupEmailInUse: "This email is already in use.",
    signupBackToLogin: "Back to Login",
    signupResendVerification: "Resend verification email",
    signupVerificationSent: "Verification email sent. Please check your inbox!",
    signupPleaseVerify: "Please verify your email to complete registration.",
    signupCheckSpam: "If you don't see the email, check your spam/junk folder.",

    // Hero section
    heroTitle: 'Learn Smarter, Test Yourself, Master Any Topic.',
    heroSmarter: 'Smarter',
    heroYourself: 'Yourself',
    heroAnyTopic: 'Any Topic',
    heroSubtitle: 'AI-powered learning tracks + instant quizzes from your own files.',
    startLearning: 'Start Learning',
    testYourself: 'Test Yourself',

    // About section
    aboutTitle: 'about us',
    aboutDescription: 'This platform helps students learn through structured tracks and test themselves using AI-generated questions from any uploaded file (PDF, Word, text, or slides).',
    aboutLearningTracks: 'Learning Tracks',
    aboutAIQuizGenerator: 'AI Quiz Generator',
    aboutProgressTracking: 'Progress Tracking',

    // Our Features section
    ourFeaturesTitle: 'our Features',
    featuresStructuredLearningTracks: 'Structured Learning Tracks',
    featuresBeginner: 'Beginner',
    featuresIntermediate: 'Intermediate',
    featuresAdvanced: 'Advanced',
    featuresUploadAnyFile: 'Upload Any File',
    featuresInstantQuiz: 'Instant Quiz',
    featuresUploadFormats: 'Upload PDF, DOCX, TXT',
    featuresAIGeneratedQuestions: 'AI generates MCQs, True/False, Short answers.',
    featuresSmartFeedback: 'Smart Feedback',
    featuresSeeScore: 'See score',
    featuresSeeCorrectAnswers: 'See correct answers',
    featuresTrackWeakTopics: 'Track weak topics',
    featuresProgressDashboard: 'Progress Dashboard',
    featuresCoursesCompleted: 'Courses completed',
    featuresQuizScores: 'Quiz scores',
    featuresLearningStreak: 'Learning streak',

    // Benefits section
    benefitsTitle: "why you'll love it",
    benefitsLearnFaster: 'Learn faster',
    benefitsLearnFasterDesc: 'Accelerate your learning journey with interactive experiences designed for your pace.',
    benefitsRememberMore: 'Remember more',
    benefitsRememberMoreDesc: "Turn knowledge into lasting memories with engaging, brain-friendly quizzes.",
    benefitsPracticeSmarter: "Practice smarter",
    benefitsPracticeSmarterDesc: "Spend less time guessing and more time mastering what truly matters.",
    benefitsNoBoringExams: "No boring exams",
    benefitsNoBoringExamsDesc: "Goodbye to stress. Hello to fun and inspiring challenges that excite you to keep going.",
    benefitsPersonalizedQuizzes: "Personalized quizzes",
    benefitsPersonalizedQuizzesDesc: "Experience quizzes crafted just for you — because your journey is unique.",

    // CTA section
    ctaStartLearningToday: "Start learning today",
    ctaStartLearningToday_cont: "and test yourself like a pro!",
    ctaUnlock: "Unlock interactive quizzes, personalized tracks, and gamified challenges designed to make you smarter, faster.",
    ctaGetStarted: "Get Started",
    ctaExploreTracks: "Explore Tracks",

    // How It Works section
    howItWorksTitle: 'How it works',
    howItWorksDescription: 'Follow these 4 easy steps to start learning, upload your notes, and generate personalized quizzes!',
    howItWorksStep1Title: 'Sign up for free',
    howItWorksStep1Desc: 'Create your profile and select your preferred learning track to get started.',
    howItWorksStep2Title: 'Pick your topics',
    howItWorksStep2Desc: 'Choose the lessons or topics you wish to learn from our available catalog.',
    howItWorksStep3Title: 'Upload notes or PDFs',
    howItWorksStep3Desc: 'Easily upload your own notes or PDF documents for personalized quizzes.',
    howItWorksStep4Title: 'Generate quiz & review',
    howItWorksStep4Desc: 'Automatically generate quizzes based on your uploaded material and review your results.',

    // PointSystem section
    pointSystemTitle: 'Earn XP as You Learn! 🚀',
    pointSystemDescription: 'Our platform rewards your effort with points. Climb the ranks and build an unstoppable daily streak!',
    pointSystemLearningBasics: 'Learning Basics',
    pointSystemEnterLesson: 'Enter a Lesson',
    pointSystemFinishLesson: 'Finish a Lesson',
    pointSystemCompleteTrack: 'Complete Track',
    pointSystemTestingKnowledge: 'Testing Knowledge',
    pointSystemPassLessonQuiz: 'Pass Lesson Quiz',
    pointSystemPassFinalTrackQuiz: 'Pass Final Track Quiz',
    pointSystemDailyStreaks: 'Daily Streaks',
    pointSystemDailyLogin: 'Daily Login',
    pointSystem7DaysStreak: '7 Days Streak',
    pointSystem30DaysStreak: '30 Days Streak',
    pointSystemDailyCap: 'Daily Cap: You can earn a maximum of 200 XP per day. Stay consistent!',
    pointSystem5XP: '+5 XP',
    pointSystem20XP: '+20 XP',
    pointSystem100XP: '+100 XP',
    pointSystem15XP: '+15 XP',
    pointSystem30XP: '+30 XP',
    pointSystem20Bonus: '+20 Bonus',
    pointSystem100Bonus: '+100 Bonus',

    // FAQ Section
    faqTitle: 'Frequently Asked Questions',
    faqQuestions: [
      {
        question: 'Is it really free?',
        answer: 'Yes! You can sign up and use all core features for free. We are working on premium options for power users, but learning and self-testing will always have a free tier.',
      },
      {
        question: 'Can I upload any kind of file?',
        answer: 'Supported file types include PDF, DOCX (Word), TXT, and slides (PPTX). If you have another format, you can convert it to one of those and upload!',
      },
      {
        question: 'Is my data private?',
        answer: 'Absolutely. Your files and learning progress are 100% private to your account, and we do not share any personal data with third parties. Check our privacy policy (linked in the footer) for details.',
      },
      {
        question: 'How does the AI quiz generator work?',
        answer: 'Our system reads your uploaded files using AI language models and generates practice questions (MCQ, True/False, short-answer) tailored to your material.',
      },
      {
        question: 'What ages/levels can use this platform?',
        answer: 'The platform is designed for middle school, high school, university, and lifelong learners—anyone who wants to learn from digital notes and test themselves!',
      },
      {
        question: 'Can teachers or tutors use it?',
        answer: 'Yes! Educators can upload resources and track their own progress, or even demo quizzes for their classes. Teacher/classroom features are coming soon.',
      },
    ],

    // --- RecentActivity.jsx (86-93) ---
    // Recent activity section
    recentActivityTitle: "Recent Activity",
    recentActivityNoActivity: "No recent activity yet.",
    recentActivityViewAll: "View All Activity",
    recentActivityLessonCompleted: "Completed lesson: {lesson}",
    recentActivityQuizTaken: "Quiz taken: {quiz}",
    // Additional entries from RecentActivity.jsx (87-93)
    recentActivityTrackStarted: "Started track: {track}",
    recentActivityTrackCompleted: "Completed track: {track}",
    recentActivityQuizPassed: "Passed quiz: {quiz}",
    recentActivityQuizFailed: "Quiz failed: {quiz}",
    recentActivityXPReceived: "Received {xp} XP",

    // --- QuizReviewPage.jsx quiz review strings ---
    quizReviewLoading: "Loading quiz review...",
    quizReviewError: "Error",
    quizReviewBackToMyQuizzes: "Back to My Quizzes",
    quizReviewNotFound: "Quiz not found",
    quizReviewGoToMyQuizzes: "Go to My Quizzes",
    quizReviewReviewPerformance: "Review your performance",
    quizReviewQuestions: "Questions",
    quizReviewBestScore: "Best Score",
    quizReviewAttempts: "Attempts",
    quizReviewSelectAttempt: "Select Attempt to Review:",
    quizReviewAttempt: "Attempt",
    quizReviewAttemptReview: "Attempt Review",
    quizReviewQ: "Q",
    quizReviewYourAnswer: "Your Answer",
    quizReviewExplanation: "Explanation",
    quizReviewNoAttempts: "No attempts yet",
    quizReviewTakeQuizFirst: "Take the quiz first to see your results here!",
    quizReviewTakeQuizNow: "Take Quiz Now",

    // MyQuizzesPage.jsx translations (lines 38-42)
    myQuizzesPageTitle: "My Quizzes", // My Quizzes - اختباراتي الخاصة
    myQuizzesPageFileName: "Quiz File Name", // Quiz File Name - اسم ملف الاختبار
    myQuizzesPageQuestionCount: "questions", // N questions - عدد الأسئلة
    myQuizzesPageCreated: "Created", // Created: DATE - تم الإنشاء: التاريخ
    myQuizzesPageReviewButton: "Review Quiz", // Review Quiz - مراجعة الاختبار

    // Footer section
    footerDevelopedBy: "Developed by",
    footerTerms: "Terms of Use",
    footerPrivacy: "Privacy Policy",
    footerContact: "Contact",
    footerFollowUs: "Follow us on",
    footerBuiltWithLove: "Built with ❤️ in Amman & around the world.",
    footerCopyright: "Copyright",
    footerAllRightsReserved: "All rights reserved.",
    footerSupport: "Support",
    footerEmailUs: "Email us",
    footerAttribution: "Icons by",
    footerLanguages: "Languages",
    footerTheme: "Theme",
    footerLight: "Light",
    footerDark: "Dark",
    footerSystem: "System",
    footerChangeLanguage: "Change language",
    footerMakeWithAI: "Made with AI ✨",

    // --- CoursesPage.jsx Translations: 236-255 ---
    coursesLoading: "Loading your courses...",
    coursesNoCourses: "You have no courses yet",
    coursesDescription: "Explore tracks and start your first learning journey now.",
    coursesBrowse: "Browse Tracks",
    coursesMyCourses: "Your Courses",
    coursesContinueDesc: "Continue where you left off, or review completed lessons to strengthen your knowledge.",
    coursesLevel_beginner: "Beginner",
    coursesLevel_intermediate: "Intermediate",
    coursesLevel_advanced: "Advanced",
    coursesLessons: "lessons",
    coursesMomentumText: "Keep your momentum and move step by step towards completing this track.",
    coursesProgress: "completed",
    coursesCompletedCourse: "Track completed",
    coursesFinalQuizRequired: "Final quiz required",
    coursesInProgress: "In progress",
    coursesGoToFinalQuizToast: "Go to final quiz...",
    coursesTakeFinalQuiz: "Take Final Quiz",
    coursesOpenLessonToast: "Opening lesson...",
    coursesContinueCourse: "Continue Learning",
    coursesNoLessonsAvailable: "No lessons available",

    // @UserCourses.jsx (198-217)
    userCoursesViewTrack: "View Track",
    userCoursesViewCourse: "View Course",
    userCoursesResumeCourse: "Resume Course",
    userCoursesResumeTrack: "Resume Track",
    userCoursesContinue: "Continue",
    userCoursesStart: "Start",
    userCoursesCompleted: "Completed",
    userCoursesLeaveTrack: "Leave Track",
    userCoursesLeaveTrackConfirm: "Are you sure you want to leave this track?",
    userCoursesLeaveYes: "Yes, leave",
    userCoursesLeaveNo: "No, keep track",
    userCoursesLeftTrackConfirmation: "You have left this track.",
    userCoursesFailedToLeave: "Failed to leave the track. Please try again.",
    userCoursesDropCourse: "Drop Course",
    userCoursesDropConfirm: "Are you sure you want to drop this course?",
    userCoursesDropYes: "Yes, drop",
    userCoursesDropNo: "No, keep course",
    userCoursesDroppedConfirmation: "You have dropped this course.",
    userCoursesFailedToDrop: "Failed to drop the course. Please try again.",

    // --- StatisticsPage.jsx (327-354)
    statisticsBackToDashboard: "&larr; Back to Dashboard", // العودة للوحة التحكم
    statisticsYourPerformance: "Your Performance", // أداؤك
    statisticsLearningJourneyDesc: "Dive deep into your learning journey and track your milestones.", // تعمق في رحلة تعلمك وتتبع إنجازاتك
    statisticsOverallProgress: "Overall Progress", // التقدم العام
    statisticsCompleted: "Completed", // مكتمل
    statisticsActive: "Active", // نشط
    statisticsDayStreak: "Day Streak", // سلسلة الأيام
    statisticsTracksEnrolled: "Tracks Enrolled", // المسارات المسجلة
    statisticsTracksCompleted: "Tracks Completed", // المسارات المكتملة
    statisticsLessonsCompleted: "Lessons Completed", // الدروس المكتملة
    statisticsOf: "/", // /
    statisticsTotalExperience: "Total Experience", // إجمالي الخبرة
    statisticsXP: "XP", // نقاط الخبرة
    statisticsTrackProgressDetails: "Track Progress Details", // تفاصيل تقدم المسار
    statisticsTracks: "Tracks", // المسارات
    statisticsNoActiveTracks: "No active tracks", // لا توجد مسارات نشطة
    statisticsEnrollTracksDesc: "Enroll in some tracks to see your detailed progress breakdown here. Learning is better when you have a path.", // سجّل في بعض المسارات لرؤية تفاصيل تقدمك هنا. التعلم أفضل عندما يكون لديك مسار.
    statisticsBrowseTracks: "Browse Tracks", // تصفح المسارات
    statisticsBeginner: "Beginner", // مبتدئ
    statisticsLessonsDone: "Lessons Done", // الدروس المنجزة
    statisticsReview: "Review", // مراجعة
    statisticsContinue: "Continue", // أكمل
    statisticsStart: "Start", // ابدأ
    statisticsFailedToLoad: "Failed to load statistics.", // فشل في تحميل الإحصائيات

    // --- Statistics.jsx (120-127) ---
    statisticsLast7Days: "Last 7 Days",
    statisticsLast30Days: "Last 30 Days",
    statisticsXPHistory: "XP History",
    statisticsShowDetails: "Show Details",
    statisticsHideDetails: "Hide Details",
    statisticsCurrentStreak: "Current Streak",
    statisticsLongestStreak: "Longest Streak",

    // --- Test Feature Components ---
    aiChatbotWelcome: "Hello! How can I assist you with your code today?",
    aiChatbotPlaceholder: "Send a message...",
    aiChatbotSend: "Send",

    fileUploadFailed: "Upload failed: ",
    fileUploadUploading: "Uploading...",
    fileUploadReady: "ready for quiz generation",
    fileUploadClear: "Clear",

    quizNoQuizLoaded: "No Quiz Loaded",
    quizUploadFileFirst: "Upload a file first to generate questions",
    quizQuestion: "Question",
    quizOf: "of",
    quizPrevious: "Previous",
    quizReviewAll: "Review all answers",
    quizAnswerToContinue: "Answer to continue",
    quizNext: "Next",
    quizSubmitting: "Submitting...",
    quizSubmit: "Submit Quiz",
    quizAnswered: "answered",
    quizCompleted: "Quiz Completed!",
    quizYouGot: "You got",
    quizOutOf: "out of",
    quizCorrect: "correct",
    quizReviewAnswers: "Review your answers:",
    quizYourAnswer: "Your answer:",
    quizNotAnswered: "Not answered",
    quizCorrectAnswer: "Correct:",
    quizTakeAgain: "Take Quiz Again",

    quizGenPleaseUpload: "Please upload a file first using the sidebar",
    quizGenSuccess: "Success!",
    quizGenQuestionsGenerated: "questions generated!",
    quizGenGoToTakeQuiz: "Go to \"Take Quiz\" tab to start!",
    quizGenFailed: "Failed to generate quiz. Try again.",
    quizGenTitle: "Quiz Generator",
    quizGenDesc: "Create quizzes from your uploaded document",
    quizGenNoFile: "No file uploaded",
    quizGenUploadPDF: "Upload a PDF using the sidebar first",
    quizGenReady: "Ready!",
    quizGenDocument: "Document",
    quizGenQuizGenerated: "Quiz Generated!",
    quizGenQuestionsReady: "questions ready",
    quizGenSwitchTo: "Switch to",
    quizGenTakeQuizTab: "\"Take Quiz\"",
    quizGenTabNow: "tab now!",
    quizGenQuestionType: "Question Type",
    quizGenMCQ: "Multiple Choice (4 options)",
    quizGenTF: "True/False (2 options)",
    quizGenMixed: "Mixed MCQ + T/F",
    quizGenQuestionsNum: "Questions (1-20)",
    quizGenTimeLimit: "Time Limit (minutes)",
    quizGenGenerating: "Generating",
    quizGenGenerateBtn: "Generate",
    quizGenQuestions: "Questions",

    testTabChat: "Chat & Summary",
    testTabGenerator: "Quiz Generator",
    testTabTakeQuiz: "Take Quiz",
    testUploadDoc: "Upload Document",
    testPowersAI: "Powers AI Chat + Quiz Generator",
    testAIChatTitle: "AI Chat & Document Summary",
    testQuizGenTitle: "Quiz Generator",
    testTakeQuizTitle: "Take Your Quiz",
  },

  ar: {
    // Header section
    menuHome: "الرئيسية",
    menuHowItWorks: "كيف يعمل",
    menuFeatures: "الميزات",
    menuPricing: "الأسعار",
    menuAbout: "عن المنصة",
    menuFAQ: "الأسئلة الشائعة",
    menuLogin: "تسجيل الدخول",
    menuSignUp: "إنشاء حساب",
    menuLang: "اللغة",
    menuProfile: "الملف الشخصي",
    menuLogout: "تسجيل الخروج",
    menuDashboard: "لوحة التحكم",
    menuMyTracks: "مساراتي",
    menuMyQuizzes: "اختباراتي",
    menuMyXP: "خبرتي",
    menuMySettings: "الإعدادات",
    menuClose: "إغلاق",
    menuDarkMode: "الوضع الليلي",
    menuLightMode: "الوضع النهاري",
    menuTheme: "الثيم",
    menuBack: "عودة",

    // --- LearnPage.jsx (9-16) ---
    learnPageTitle: "التعلم",
    learnPageSubtitle: "لوحة التعلم الشخصية الخاصة بك",
    learnPageWelcome: "مرحبًا بك في لوحة التعلم الخاصة بك!",
    learnPageActiveTracks: "المسارات النشطة",
    learnPageFinishedTracks: "المسارات المنتهية",
    learnPageNoTracks: "ليس لديك أي مسارات تعلم نشطة بعد.",
    learnPageStartTrack: "ابدأ مسارًا جديدًا",
    learnPageBrowseTracks: "تصفح كل المسارات",

    // --- Lesson.jsx (221-234) ---
    lessonPageTitle: "الدرس",
    lessonPageProgress: "تقدم الدرس",
    lessonPageNextLesson: "الدرس التالي",
    lessonPagePrevLesson: "الدرس السابق",
    lessonPageMarkComplete: "تحديد كمكتمل",
    lessonPageCompleted: "اكتمل!",
    lessonPageNotStarted: "لم يبدأ",
    lessonPageContinue: "أكمل الدرس",
    lessonPageStart: "ابدأ الدرس",
    lessonPageResources: "المصادر",
    lessonPageNotes: "ملاحظات",
    lessonPageQuiz: "اختبار الدرس",
    lessonPageCongrats: "تهانينا! لقد أكملت هذا الدرس.",

    // Dashboard.jsx (40-43)
    dashboardWelcomeMessage: "مرحبًا بعودتك،",
    dashboardContinueLearning: "واصل التعلم",
    dashboardStatsTitle: "إحصائياتك",
    dashboardStartNewTrack: "ابدأ مسارًا جديدًا",

    // QuickActions.jsx (5-9)
    quickActionsTitle: "إجراءات سريعة",
    quickActionsUploadNotes: "رفع ملف",
    quickActionsCreateQuiz: "إنشاء اختبار ",
    quickActionsStartLearning: "استكمال الدورة",
    quickActionsViewDashboard: "عرض الإحصائيات التفصيلية",

    // Login.jsx translations (lines 113-121)
    loginTitle: "تسجيل الدخول",
    loginEmailLabel: "البريد الإلكتروني",
    loginEmailPlaceholder: "عنوان البريد الإلكتروني...",
    loginPasswordLabel: "كلمة المرور",
    loginPasswordPlaceholder: "كلمة المرور...",
    loginButton: "تسجيل الدخول",
    loginSignUp: "إنشاء حساب →",
    loginError: "رسالة خطأ (مصادقة)",

    // SignUp / Register translations
    signupTitle: "إنشاء حساب",
    signupNameLabel: "الاسم الكامل",
    signupNamePlaceholder: "اسمك الكامل...",
    signupEmailLabel: "البريد الإلكتروني",
    signupEmailPlaceholder: "أدخل بريدك الإلكتروني...",
    signupPasswordLabel: "كلمة المرور",
    signupPasswordPlaceholder: "أنشئ كلمة مرور...",
    signupConfirmPasswordLabel: "تأكيد كلمة المرور",
    signupConfirmPasswordPlaceholder: "أعد كتابة كلمة المرور...",
    signupButton: "إنشاء حساب جديد",
    signupAlreadyMember: "لديك حساب؟ تسجيل الدخول",
    signupTerms: "بإنشائك الحساب أنت توافق على",
    signupTermsLink: "شروط الخدمة",
    signupAnd: "و",
    signupPrivacyLink: "سياسة الخصوصية",
    signupSuccess: "تم إنشاء حسابك! يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.",
    signupErrorRequired: "يرجى تعبئة جميع الحقول.",
    signupErrorPasswordMatch: "كلمتا المرور غير متطابقتين.",
    signupErrorShortPassword: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
    signupErrorInvalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    signupError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    signupEmailInUse: "هذا البريد الإلكتروني مستخدم بالفعل.",
    signupBackToLogin: "العودة لتسجيل الدخول",
    signupResendVerification: "إعادة إرسال رسالة التفعيل",
    signupVerificationSent: "تم إرسال رسالة التفعيل. يرجى مراجعة البريد الوارد!",
    signupPleaseVerify: "يرجى تفعيل بريدك الإلكتروني لإكمال عملية التسجيل.",
    signupCheckSpam: "إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوبة.",

    // Hero section
    heroTitle: 'تعلم بذكاء، اختبر نفسك، أتقن أي موضوع.',
    heroSmarter: 'بذكاء',
    heroYourself: 'نفسك',
    heroAnyTopic: 'أي موضوع',
    heroSubtitle: 'مسارات تعليمية مدعومة بالذكاء الاصطناعي + اختبارات فورية من ملفاتك الخاصة.',
    startLearning: 'ابدأ التعلم',
    testYourself: 'اختبر نفسك',

    // About section
    aboutTitle: 'عنّا',
    aboutDescription: 'تساعد هذه المنصة الطلاب على التعلم من خلال مسارات منظمة واختبار أنفسهم باستخدام أسئلة تم إنشاؤها بالذكاء الاصطناعي من أي ملف يتم رفعه (PDF، وورد، نص، أو شرائح).',
    aboutLearningTracks: 'مسارات التعلم',
    aboutAIQuizGenerator: 'منشئ اختبارات الذكاء الاصطناعي',
    aboutProgressTracking: 'تتبع التقدم',

    // Our Features section
    ourFeaturesTitle: 'ميزاتنا',
    featuresStructuredLearningTracks: 'مسارات تعلم منظمة',
    featuresBeginner: 'مبتدئ',
    featuresIntermediate: 'متوسط',
    featuresAdvanced: 'متقدم',
    featuresUploadAnyFile: 'رفع أي ملف',
    featuresInstantQuiz: 'اختبار فوري',
    featuresUploadFormats: 'رفع PDF أو DOCX أو TXT',
    featuresAIGeneratedQuestions: 'الذكاء الاصطناعي ينشئ أسئلة اختيار من متعدد، صح/خطأ، وإجابات قصيرة.',
    featuresSmartFeedback: 'تغذية راجعة ذكية',
    featuresSeeScore: 'عرض الدرجة',
    featuresSeeCorrectAnswers: 'عرض الإجابات الصحيحة',
    featuresTrackWeakTopics: 'تتبع المواضيع الضعيفة',
    featuresProgressDashboard: 'لوحة تتبع التقدم',
    featuresCoursesCompleted: 'الدورات المكتملة',
    featuresQuizScores: 'درجات الاختبارات',
    featuresLearningStreak: 'سلسلة التعلم',

    // Benefits section
    benefitsTitle: "لماذا ستحب المنصة",
    benefitsLearnFaster: 'تعلّم بسرعة أكبر',
    benefitsLearnFasterDesc: 'سرّع رحلة تعلمك مع تجارب تفاعلية مصممة لتناسب وتيرتك.',
    benefitsRememberMore: 'تذكّر المزيد',
    benefitsRememberMoreDesc: "حوّل المعرفة إلى ذكريات دائمة من خلال اختبارات تفاعلية صديقة للعقل.",
    benefitsPracticeSmarter: "تدرب بذكاء",
    benefitsPracticeSmarterDesc: "استغرق وقتاً أقل في التخمين وركز أكثر على إتقان ما يهمك حقًا.",
    benefitsNoBoringExams: "لا امتحانات مملة",
    benefitsNoBoringExamsDesc: "وداعاً للضغط النفسي. أهلاً بالتحديات الممتعة والملهمة التي تحفزك للاستمرار.",
    benefitsPersonalizedQuizzes: "اختبارات مخصصة لك",
    benefitsPersonalizedQuizzesDesc: "جرّب اختبارات صُممت خصيصاً لك لأن رحلتك فريدة من نوعها.",

    // CTA section
    ctaStartLearningToday: "ابدأ التعلم اليوم",
    ctaStartLearningToday_cont: "واختبر نفسك كالمحترفين!",
    ctaUnlock: "افتح اختبارات تفاعلية، ومسارات تعليمية مخصصة، وتحديات محفزة مصممة لتجعلك أكثر ذكاءً وسرعة.",
    ctaGetStarted: "ابدأ الآن",
    ctaExploreTracks: "استكشف المسارات",

    // How It Works section
    howItWorksTitle: 'كيف يعمل',
    howItWorksDescription: 'اتبع هذه الخطوات الأربع السهلة لبدء التعلم ورفع ملاحظاتك وإنشاء اختبارات مخصصة!',
    howItWorksStep1Title: 'سجّل مجانًا',
    howItWorksStep1Desc: 'أنشئ ملفك الشخصي واختر مسار التعلم المفضل لديك للبدء.',
    howItWorksStep2Title: 'اختر مواضيعك',
    howItWorksStep2Desc: 'اختر الدروس أو المواضيع التي ترغب في تعلمها من الكتالوج المتاح لدينا.',
    howItWorksStep3Title: 'حمّل ملاحظاتك أو ملفات PDF',
    howItWorksStep3Desc: 'يمكنك بسهولة رفع ملاحظاتك أو ملفات PDF الخاصة بك لإنشاء اختبارات مخصصة.',
    howItWorksStep4Title: 'أنشئ اختبارًا وراجع النتائج',
    howItWorksStep4Desc: 'يتم تلقائيًا إنشاء اختبارات من المواد التي رفعتها وراجع نتائجك.',

    // PointSystem section
    pointSystemTitle: 'احصل على نقاط الخبرة أثناء التعلم! 🚀',
    pointSystemDescription: 'منصتنا تكافئ جهودك بالنقاط. ارتق في التصنيفات واصنع سلسلة يومية لا تقهر!',
    pointSystemLearningBasics: 'أساسيات التعلم',
    pointSystemEnterLesson: 'دخول درس',
    pointSystemFinishLesson: 'إنهاء الدرس',
    pointSystemCompleteTrack: 'إكمال المسار',
    pointSystemTestingKnowledge: 'اختبر معرفتك',
    pointSystemPassLessonQuiz: 'اجتز اختبار الدرس',
    pointSystemPassFinalTrackQuiz: 'اجتز اختبار المسار النهائي',
    pointSystemDailyStreaks: 'سلسلة الإنجاز اليومية',
    pointSystemDailyLogin: 'تسجيل الدخول اليومي',
    pointSystem7DaysStreak: 'سلسلة 7 أيام',
    pointSystem30DaysStreak: 'سلسلة 30 يومًا',
    pointSystemDailyCap: 'الحد اليومي: يمكنك كسب حد أقصى 200 نقطة خبرة يوميًا. استمر في المثابرة!',
    pointSystem5XP: '+5 نقطة خبرة',
    pointSystem20XP: '+20 نقطة خبرة',
    pointSystem100XP: '+100 نقطة خبرة',
    pointSystem15XP: '+15 نقطة خبرة',
    pointSystem30XP: '+30 نقطة خبرة',
    pointSystem20Bonus: '+20 مكافأة',
    pointSystem100Bonus: '+100 مكافأة',

    // FAQ Section
    faqTitle: 'الأسئلة الشائعة',
    faqQuestions: [
      {
        question: 'هل المنصة مجانية حقًا؟',
        answer: 'نعم! يمكنك التسجيل واستخدام كل الميزات الأساسية مجانًا. نحن نعمل على خيارات مدفوعة للمستخدمين المتقدمين، لكن التعلم والاختبارات سيبقيان متاحين مجانًا دائمًا.',
      },
      {
        question: 'هل يمكنني رفع أي نوع من الملفات؟',
        answer: 'الأنواع المدعومة هي PDF، و DOCX (وورد)، و TXT، وشرائح العروض التقديمية (PPTX). إذا كان لديك نوع مختلف، يمكنك تحويله إلى أحد هذه الأنواع ورفعه!',
      },
      {
        question: 'هل بياناتي خاصة وآمنة؟',
        answer: 'طبعًا. ملفاتك وتقدمك محفوظان بخصوصية تامة في حسابك، ولا نشارك أي بيانات شخصية مع أي طرف ثالث. راجع سياسة الخصوصية (الرابط في الأسفل) لمزيد من التفاصيل.',
      },
      {
        question: 'كيف يعمل مولّد الاختبارات بالذكاء الاصطناعي؟',
        answer: 'يقرأ نظامنا ملفاتك باستخدام نماذج الذكاء الاصطناعي ويولّد أسئلة تدريبية (اختيار من متعدد، صح أو خطأ، إجابات قصيرة) مصممة خصيصًا لمادتك.',
      },
      {
        question: 'ما هي الأعمار أو المستويات التي يمكنها استخدام المنصة؟',
        answer: 'المنصة مصممة لطلاب الإعدادية والثانوية والجامعة وكل متعلم مدى الحياة – أي شخص يرغب بالتعلم من ملاحظاته الرقمية واختبار نفسه!',
      },
      {
        question: 'هل يمكن للمعلمين أو المدرّسين استخدامها؟',
        answer: 'نعم! يمكن للمعلمين رفع مصادرهم وتتبع تقدمهم، أو حتى تجربة الاختبارات مع طلابهم. ميزات خاصة بالمعلم والفصول قادمة قريبًا.',
      },
    ],

    // --- RecentActivity.jsx (86-93) ---
    // Recent activity section
    recentActivityTitle: "النشاط الأخير",
    recentActivityNoActivity: "لا يوجد أنشطة حديثة بعد.",
    recentActivityViewAll: "عرض كل الأنشطة",
    recentActivityLessonCompleted: "أكملت الدرس: {lesson}",
    recentActivityQuizTaken: "أخذت اختبار: {quiz}",
    // Additional entries from RecentActivity.jsx (87-93)
    recentActivityTrackStarted: "بدأت المسار: {track}",
    recentActivityTrackCompleted: "أنهيت المسار: {track}",
    recentActivityQuizPassed: "نجحت في اختبار: {quiz}",
    recentActivityQuizFailed: "فشلت في اختبار: {quiz}",
    recentActivityXPReceived: "حصلت على {xp} نقطة خبرة",

    // --- QuizReviewPage.jsx quiz review strings ---
    quizReviewLoading: "جاري تحميل مراجعة الاختبار...",
    quizReviewError: "خطأ",
    quizReviewBackToMyQuizzes: "العودة إلى اختباراتي",
    quizReviewNotFound: "لم يتم العثور على الاختبار",
    quizReviewGoToMyQuizzes: "الذهاب إلى اختباراتي",
    quizReviewReviewPerformance: "راجع أداءك",
    quizReviewQuestions: "أسئلة",
    quizReviewBestScore: "أفضل نتيجة",
    quizReviewAttempts: "المحاولات",
    quizReviewSelectAttempt: "اختر محاولة للمراجعة:",
    quizReviewAttempt: "محاولة",
    quizReviewAttemptReview: "مراجعة المحاولة",
    quizReviewQ: "س",
    quizReviewYourAnswer: "إجابتك",
    quizReviewExplanation: "شرح",
    quizReviewNoAttempts: "لا توجد محاولات بعد",
    quizReviewTakeQuizFirst: "قم بأداء الاختبار أولا لرؤية نتائجك هنا!",
    quizReviewTakeQuizNow: "خذ الاختبار الآن",

    // MyQuizzesPage.jsx translations (lines 38-42)
    myQuizzesPageTitle: "اختباراتي الخاصة", // My Quizzes - اختباراتي الخاصة
    myQuizzesPageFileName: "اسم ملف الاختبار", // Quiz File Name - اسم ملف الاختبار
    myQuizzesPageQuestionCount: "عدد الأسئلة", // N questions - عدد الأسئلة
    myQuizzesPageCreated: "تم الإنشاء", // Created: DATE - تم الإنشاء: التاريخ
    myQuizzesPageReviewButton: "مراجعة الاختبار", // Review Quiz - مراجعة الاختبار

    // Footer section
    footerDevelopedBy: "تم التطوير بواسطة",
    footerTerms: "شروط الاستخدام",
    footerPrivacy: "سياسة الخصوصية",
    footerContact: "تواصل معنا",
    footerFollowUs: "تابعنا على",
    footerBuiltWithLove: "صنع بحب ❤️ في عمّان وعلى امتداد العالم.",
    footerCopyright: "حقوق النشر",
    footerAllRightsReserved: "جميع الحقوق محفوظة.",
    footerSupport: "الدعم",
    footerEmailUs: "راسلنا",
    footerAttribution: "الأيقونات من تصميم",
    footerLanguages: "اللغات",
    footerTheme: "المظهر",
    footerLight: "فاتح",
    footerDark: "داكن",
    footerSystem: "النظام",
    footerChangeLanguage: "تغيير اللغة",
    footerMakeWithAI: "مصنوع بالذكاء الاصطناعي ✨",

    // --- CoursesPage.jsx Translations: 236-255 ---
    coursesLoading: "جاري تحميل الدورات الخاصة بك...",
    coursesNoCourses: "ليس لديك أي دورات بعد",
    coursesDescription: "استكشف المسارات وابدأ أول رحلة تعلم لك الآن.",
    coursesBrowse: "تصفح المسارات",
    coursesMyCourses: "دوراتك",
    coursesContinueDesc: "تابع من حيث توقفت، أو راجع الدروس المكتملة لتعزيز معرفتك.",
    coursesLevel_beginner: "مبتدئ",
    coursesLevel_intermediate: "متوسط",
    coursesLevel_advanced: "متقدم",
    coursesLessons: "دروس",
    coursesMomentumText: "حافظ على تقدمك وتحرك خطوة بخطوة نحو إكمال هذا المسار.",
    coursesProgress: "مكتمل",
    coursesCompletedCourse: "تم إنهاء المسار",
    coursesFinalQuizRequired: "الاختبار النهائي مطلوب",
    coursesInProgress: "قيد التقدم",
    coursesGoToFinalQuizToast: "...انتقل للاختبار النهائي",
    coursesTakeFinalQuiz: "حل الاختبار النهائي",
    coursesOpenLessonToast: "...جاري فتح الدرس",
    coursesContinueCourse: "متابعة التعلم",
    coursesNoLessonsAvailable: "لا توجد دروس متاحة",

    // @UserCourses.jsx (198-217)
    userCoursesViewTrack: "عرض المسار",
    userCoursesViewCourse: "عرض الدورة",
    userCoursesResumeCourse: "استكمال الدورة",
    userCoursesResumeTrack: "استئناف المسار",
    userCoursesContinue: "أكمل",
    userCoursesStart: "ابدأ",
    userCoursesCompleted: "مكتمل",
    userCoursesLeaveTrack: "مغادرة المسار",
    userCoursesLeaveTrackConfirm: "هل أنت متأكد أنك تريد مغادرة هذا المسار؟",
    userCoursesLeaveYes: "نعم، مغادرة",
    userCoursesLeaveNo: "لا، أبقِ المسار",
    userCoursesLeftTrackConfirmation: "لقد غادرت هذا المسار.",
    userCoursesFailedToLeave: "فشل في مغادرة المسار. يرجى المحاولة مرة أخرى.",
    userCoursesDropCourse: "إلغاء التسجيل في الدورة",
    userCoursesDropConfirm: "هل أنت متأكد أنك تريد إلغاء التسجيل في هذه الدورة؟",
    userCoursesDropYes: "نعم، إلغاء التسجيل",
    userCoursesDropNo: "لا، أبقِ الدورة",
    userCoursesDroppedConfirmation: "تم إلغاء تسجيلك في هذه الدورة.",
    userCoursesFailedToDrop: "فشل في إلغاء التسجيل في الدورة. يرجى المحاولة مرة أخرى.",

    // --- StatisticsPage.jsx (327-354)
    statisticsBackToDashboard: "العودة للوحة التحكم", // &larr; Back to Dashboard
    statisticsYourPerformance: "أداؤك", // Your Performance
    statisticsLearningJourneyDesc: "تعمق في رحلة تعلمك وتتبع إنجازاتك", // Dive deep into your learning journey and track your milestones.
    statisticsOverallProgress: "التقدم العام", // Overall Progress
    statisticsCompleted: "مكتمل", // Completed
    statisticsActive: "نشط", // Active
    statisticsDayStreak: "سلسلة الأيام", // Day Streak
    statisticsTracksEnrolled: "المسارات المسجلة", // Tracks Enrolled
    statisticsTracksCompleted: "المسارات المكتملة", // Tracks Completed
    statisticsLessonsCompleted: "الدروس المكتملة", // Lessons Completed
    statisticsOf: "/", // /
    statisticsTotalExperience: "إجمالي الخبرة", // Total Experience
    statisticsXP: "نقاط الخبرة", // XP
    statisticsTrackProgressDetails: "تفاصيل تقدم المسار", // Track Progress Details
    statisticsTracks: "المسارات", // Tracks
    statisticsNoActiveTracks: "لا توجد مسارات نشطة", // No active tracks
    statisticsEnrollTracksDesc: "سجّل في بعض المسارات لرؤية تفاصيل تقدمك هنا. التعلم أفضل عندما يكون لديك مسار.", // Enroll in some tracks to see your detailed progress breakdown here. Learning is better when you have a path.
    statisticsBrowseTracks: "تصفح المسارات", // Browse Tracks
    statisticsBeginner: "مبتدئ", // Beginner
    statisticsLessonsDone: "الدروس المنجزة", // Lessons Done
    statisticsReview: "مراجعة", // Review
    statisticsContinue: "أكمل", // Continue
    statisticsStart: "ابدأ", // Start
    statisticsFailedToLoad: "فشل في تحميل الإحصائيات", // Failed to load statistics.

    // --- Statistics.jsx (120-127) ---
    statisticsLast7Days: "آخر 7 أيام",
    statisticsLast30Days: "آخر 30 يومًا",
    statisticsXPHistory: "تاريخ نقاط الخبرة",
    statisticsShowDetails: "عرض التفاصيل",
    statisticsHideDetails: "إخفاء التفاصيل",
    statisticsCurrentStreak: "السلسلة الحالية",
    statisticsLongestStreak: "أطول سلسلة",

    // --- Test Feature Components ---
    aiChatbotWelcome: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
    aiChatbotPlaceholder: "أرسل رسالة...",
    aiChatbotSend: "إرسال",

    fileUploadFailed: "فشل الرفع: ",
    fileUploadUploading: "جاري الرفع...",
    fileUploadReady: "جاهز لإنشاء الاختبار",
    fileUploadClear: "مسح",

    quizNoQuizLoaded: "لا يوجد اختبار محمل",
    quizUploadFileFirst: "قم برفع ملف أولاً لإنشاء الأسئلة",
    quizQuestion: "سؤال",
    quizOf: "من",
    quizPrevious: "السابق",
    quizReviewAll: "مراجعة جميع الإجابات",
    quizAnswerToContinue: "أجب للمتابعة",
    quizNext: "التالي",
    quizSubmitting: "جاري الإرسال...",
    quizSubmit: "إرسال الاختبار",
    quizAnswered: "تمت الإجابة",
    quizCompleted: "اكتمل الاختبار!",
    quizYouGot: "لقد حصلت على",
    quizOutOf: "من أصل",
    quizCorrect: "إجابة صحيحة",
    quizReviewAnswers: "راجع إجاباتك:",
    quizYourAnswer: "إجابتك:",
    quizNotAnswered: "لم تتم الإجابة",
    quizCorrectAnswer: "الإجابة الصحيحة:",
    quizTakeAgain: "أعد الاختبار",

    quizGenPleaseUpload: "يرجى رفع ملف أولاً باستخدام الشريط الجانبي",
    quizGenSuccess: "نجاح!",
    quizGenQuestionsGenerated: "تم إنشاء الأسئلة!",
    quizGenGoToTakeQuiz: "اذهب إلى علامة التبويب \"اختبار\" للبدء!",
    quizGenFailed: "فشل إنشاء الاختبار. حاول مرة أخرى.",
    quizGenTitle: "منشئ الاختبارات",
    quizGenDesc: "أنشئ اختبارات من المستند الذي قمت برفعه",
    quizGenNoFile: "لم يتم رفع أي ملف",
    quizGenUploadPDF: "قم برفع ملف PDF باستخدام الشريط الجانبي أولاً",
    quizGenReady: "جاهز!",
    quizGenDocument: "مستند",
    quizGenQuizGenerated: "تم إنشاء الاختبار!",
    quizGenQuestionsReady: "أسئلة جاهزة",
    quizGenSwitchTo: "انتقل إلى",
    quizGenTakeQuizTab: "\"اختبار\"",
    quizGenTabNow: "الآن!",
    quizGenQuestionType: "نوع السؤال",
    quizGenMCQ: "اختيار من متعدد (4 خيارات)",
    quizGenTF: "صح/خطأ (خياران)",
    quizGenMixed: "مختلط (اختيار من متعدد + صح/خطأ)",
    quizGenQuestionsNum: "عدد الأسئلة (1-20)",
    quizGenTimeLimit: "الحد الزمني (بالدقائق)",
    quizGenGenerating: "جاري الإنشاء",
    quizGenGenerateBtn: "إنشاء",
    quizGenQuestions: "أسئلة",

    testTabChat: "الدردشة والملخص",
    testTabGenerator: "منشئ الاختبارات",
    testTabTakeQuiz: "خذ الاختبار",
    testUploadDoc: "رفع مستند",
    testPowersAI: "يدعم الدردشة بالذكاء الاصطناعي وإنشاء الاختبارات",
    testAIChatTitle: "الدردشة بالذكاء الاصطناعي وملخص المستند",
    testQuizGenTitle: "منشئ الاختبارات",
    testTakeQuizTitle: "خذ اختبارك",

    // --- Learn Feature Components ---
    learnSearchPlaceholder: "ابحث عن الدورات، مثل HTML",
    learnLoading: "جاري تحميل الدرس...",
    lessonOpening: "جاري فتح الدرس...",
    lessonQuizUnlocked: "عمل رائع! تم فتح درس جديد \uD83C\uDF89",
    lessonQuizCompleteError: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    lessonImageAlt: "صورة الدرس",
    lessonQuizTitle: "اختبار الدرس",
    lessonQuizInProgress: "قيد التنفيذ",
    lessonQuizSubmit: "إرسال الاختبار",
    lessonQuizAnswered: "لقد أجبت",
    lessonQuizOutOf: "من أصل",
    lessonQuizCorrectly: "أسئلة بشكل صحيح.",
    lessonQuizAllCorrect: "جميع الإجابات صحيحة. تم فتح الدرس التالي \u2714",
    lessonQuizReviewTryAgain: "الإجابات الصحيحة مظللة باللون الأخضر. راجعها وحاول مرة أخرى.",
    lessonQuizTryAgain: "حاول مرة أخرى",
    lessonsNoAvailable: "لا توجد دروس متاحة.",
    trackFinalQuizTitle: "الاختبار النهائي للمسار",
    trackFinalQuizDesc: "اختبر معلوماتك في جميع دروس هذا المسار.",
    trackFinalQuizBadge: "اختبار المسار",
    trackFinalQuizNotAnswered: "لم تجب على هذا السؤال.",
    trackFinalQuizSubmitBtn: "إرسال الاختبار النهائي",
    trackFinalQuizSubmitting: "جاري الإرسال...",
    trackFinalQuizPleaseAnswerAll: "يرجى الإجابة على جميع الأسئلة قبل الإرسال.",
    trackFinalQuizExcellent: "ممتاز! تم تحديد المسار كمكتمل.",
    trackFinalQuizTryAgain: "أعد محاولة الاختبار النهائي",
    trackFinalQuizIncompleteInfo: "بعض الإجابات غير صحيحة. راجعها وحاول مرة أخرى.",
    trackFinalQuizCongrats: "\uD83C\uDF89 تهانينا! تم تحديد المسار كمكتمل.",
    trackFinalQuizError: "حدث خطأ أثناء تحديد المسار كمكتمل.",
    trackAboutTrack: "حول هذا المسار",
    trackVisualHighlights: "أبرز المعالم المرئية",
    trackEnrollNow: "سجل الآن",
    trackEnrolledSuccess: "لقد قمت بالتسجيل في هذا المسار!",
  },
};

export default translations;
