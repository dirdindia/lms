import { useState } from "react";
import { MessageCircle, X, Info } from "lucide-react";

const qaPairs = [
  { keywords: ["fee", "cost", "price", "paise", "subscription", "pay"], answer: "Our platform offers highly affordable subscription models tailored to your class. Please check the 'Courses' page for detailed pricing." },
  { keywords: ["live", "teacher", "tutor", "call", "connect", "video", "audio"], answer: "You can connect with a live tutor 24x7 through 1-on-1 video or audio calls. We guarantee a response within 60 seconds!" },
  { keywords: ["ai", "bot", "solve", "photo", "picture", "scan", "camera"], answer: "Our advanced AI Tutor can solve your doubts instantly! Just snap a photo of your question or type it out for a step-by-step explanation." },
  { keywords: ["class", "classes", "grade", "syllabus", "teach", "9", "10", "11", "12"], answer: "We currently cover Classes 9th to 12th, offering both foundation building and senior secondary subject mastery." },
  { keywords: ["exam", "jee", "neet", "board", "competitive", "preparation"], answer: "Yes, absolutely! We provide specialized target batches and mock tests for JEE, NEET, and standard Board exams." },
  { keywords: ["hindi", "language", "english", "medium", "regional"], answer: "Language is not a barrier here! Our platform, AI tutor, and live teachers support both Hindi and English mediums." },
  { keywords: ["time", "availability", "hours", "kab", "night", "morning"], answer: "We are proudly available 24x7! Whether it's early morning or late at night, you can ask questions or connect to a tutor anytime." },
  { keywords: ["contact", "phone", "number", "call", "support", "help", "enroll"], answer: "We're here to help. You can call us directly at +91 94319 45860 or visit the Contact page for more enrollment options." },
  { keywords: ["material", "notes", "pdf", "study", "mock", "test", "bank"], answer: "We offer comprehensive digital study materials including mock tests, question banks, practice sets, and revision notes." },
  { keywords: ["offline", "school", "center", "district"], answer: "On request from the district administration, our qualified teachers can also be deployed at schools and designated offline centres." },
  { keywords: ["free", "trial", "demo", "sample"], answer: "You can explore our AI Tutor and take a demo live session for free! Check the 'Live Tutoring' section to start." },
  { keywords: ["password", "login", "account", "register", "signup"], answer: "To register, click on the 'Enroll Now' button. If you're facing login issues, please contact our support team at +91 94319 45860." },
  { keywords: ["subject", "physics", "chemistry", "math", "biology"], answer: "We cover all major subjects including Mathematics, Science (Physics, Chemistry, Biology), English, and Hindi." },
  { keywords: ["app", "download", "playstore", "ios", "android"], answer: "Our platform is fully responsive and works beautifully on any mobile browser, tablet, or laptop. No app download is required right now!" },
  { keywords: ["who", "about", "sangh", "nawdeep", "mahila"], answer: "Nawdeep Mahila Sangh is dedicated to bringing quality, accelerated, and personalized education to every student in Sahibganj and beyond." },
];

function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  for (const qa of qaPairs) {
    if (qa.keywords.some(kw => lowerInput.includes(kw))) {
      return qa.answer;
    }
  }
  return "Thanks for reaching out! Please explore our website or contact support at +91 94319 45860 for more details.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const suggestedQuestions = [
    "What classes do you cover?",
    "How fast do teachers respond?",
    "Can I use it in Hindi?",
    "What is the fee?",
    "Do you prepare for JEE/NEET?",
    "Is the AI Tutor free?",
    "How to contact support?",
    "Can I upload a photo of my doubt?",
    "Do you provide study materials?",
    "What if I need offline support?",
    "Are live classes 1-on-1?",
    "Do you offer mock tests?",
    "How do I reset my password?",
    "Can I study late at night?",
    "Is there an Android App?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 ">
      {/* FAQ Split Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift sm:w-[700px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-deep px-4 py-3 text-primary-foreground">
            <div>
              <h3 className="font-semibold">NMS FAQ Helpdesk</h3>
              <p className="text-xs text-primary-foreground/80">Select a question to see the answer</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/20 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Split View */}
          <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
            
            {/* Left Side: Questions List */}
            <div className="flex flex-col border-b sm:border-b-0 sm:border-r border-border bg-secondary/10 w-full sm:w-[280px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="p-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                All Questions
              </div>
              <div className="flex flex-col px-2 pb-4 gap-1">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setActiveQuestion(q)}
                    className={`text-left rounded-lg px-3 py-2.5 text-sm transition-colors cursor-pointer ${
                      activeQuestion === q
                        ? "bg-brand text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-brand/10"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Answer View */}
            <div className="flex-1 bg-background p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {activeQuestion ? (
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-brand">
                      <Info className="h-3.5 w-3.5" /> Answer
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-brand-deep mb-4 leading-snug">
                    {activeQuestion}
                  </h4>
                  <div className="text-base leading-relaxed text-muted-foreground bg-secondary/20 p-5 rounded-2xl border border-border/50 shadow-soft">
                    {getBotResponse(activeQuestion)}
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                  <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Select any question from the left menu <br className="hidden sm:block" />
                    to see its answer here.
                  </p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-lift transition-transform hover:scale-110"
          aria-label="Open FAQ"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
