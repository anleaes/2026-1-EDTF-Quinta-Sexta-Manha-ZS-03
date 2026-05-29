"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Sparkles, ChevronRight } from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    question: "Explique o conceito de derivada e sua aplicação no cálculo de taxas de variação.",
    correctAnswer: "A derivada representa a taxa de variação instantânea de uma função em relação a uma variável independente. Geometricamente, é a inclinação da reta tangente à curva. É usada para calcular velocidades, acelerações e otimização de funções.",
  },
  {
    id: 2,
    question: "Descreva a relação entre força, massa e aceleração segundo a segunda lei de Newton.",
    correctAnswer: "A segunda lei de Newton estabelece que a força resultante aplicada a um corpo é igual ao produto de sua massa pela aceleração adquirida (F = m.a). Isso significa que quanto maior a massa, maior a força necessária para produzir a mesma aceleração.",
  },
  {
    id: 3,
    question: "O que são ligações covalentes e como elas se formam?",
    correctAnswer: "Ligações covalentes são ligações químicas formadas pelo compartilhamento de pares de elétrons entre dois átomos. Ocorrem principalmente entre não-metais que buscam completar suas camadas de valência para atingir estabilidade.",
  },
];

type FeedbackType = "correct" | "partial" | "incorrect" | null;

export default function FlashcardsIAPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQuestion = mockQuestions[currentIndex];

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const answerLength = userAnswer.trim().length;
      let type: FeedbackType;
      let text: string;

      if (answerLength > 100) {
        type = "correct";
        text = "Excelente! Sua resposta demonstra compreensão completa do conceito. Você abordou os pontos principais de forma clara e precisa.";
      } else if (answerLength > 50) {
        type = "partial";
        text = "Boa resposta! Você entendeu o conceito básico, mas poderia expandir mais sobre as aplicações práticas e exemplos específicos.";
      } else {
        type = "incorrect";
        text = "Sua resposta precisa de mais detalhes. Tente elaborar mais sobre o conceito e incluir exemplos para demonstrar compreensão.";
      }

      setFeedback(type);
      setFeedbackText(text);
      setIsEvaluating(false);
    }, 1500);
  };

  const handleNext = () => {
    setUserAnswer("");
    setFeedback(null);
    setFeedbackText("");
    setCurrentIndex((prev) => (prev + 1) % mockQuestions.length);
  };

  const getFeedbackStyles = () => {
    switch (feedback) {
      case "correct":
        return "border-success bg-success/10";
      case "partial":
        return "border-warning bg-warning/10";
      case "incorrect":
        return "border-destructive bg-destructive/10";
      default:
        return "";
    }
  };

  const getFeedbackTitle = () => {
    switch (feedback) {
      case "correct":
        return { text: "Correto!", color: "text-success" };
      case "partial":
        return { text: "Parcialmente correto", color: "text-warning" };
      case "incorrect":
        return { text: "Precisa melhorar", color: "text-destructive" };
      default:
        return { text: "", color: "" };
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Flashcards IA</h1>
        <p className="text-muted-foreground">
          Responda às perguntas e receba avaliação inteligente da IA.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium text-foreground">
              Card {currentIndex + 1} de {mockQuestions.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentIndex + 1) / mockQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-card p-6">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Pergunta
          </span>
          <p className="text-lg font-medium leading-relaxed text-foreground">
            {currentQuestion.question}
          </p>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Sua resposta
          </label>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            rows={5}
            className="w-full resize-none rounded-xl border border-border bg-input p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={!userAnswer.trim() || isEvaluating}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-5 w-5" />
          {isEvaluating ? "Avaliando..." : "Avaliar com IA"}
        </button>

        {feedback && (
          <div className={`mb-6 rounded-xl border-2 p-6 ${getFeedbackStyles()}`}>
            <h3 className={`mb-2 text-lg font-semibold ${getFeedbackTitle().color}`}>
              {getFeedbackTitle().text}
            </h3>
            <p className="mb-4 text-foreground">{feedbackText}</p>
            <div className="rounded-lg bg-card/50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resposta esperada
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {currentQuestion.correctAnswer}
              </p>
            </div>
          </div>
        )}

        {feedback && (
          <button
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Próximo Card
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </DashboardLayout>
  );
}
