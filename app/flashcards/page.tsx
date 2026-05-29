"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { CreditCard, Plus, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const mockFlashcards = [
  {
    id: 1,
    front: "O que é derivada em cálculo?",
    back: "A derivada é a taxa de variação instantânea de uma função em relação a uma variável. Geometricamente, representa a inclinação da reta tangente à curva em um ponto.",
    deck: "Cálculo I",
  },
  {
    id: 2,
    front: "Qual é a fórmula da segunda lei de Newton?",
    back: "F = m × a, onde F é a força resultante, m é a massa do objeto e a é a aceleração.",
    deck: "Física",
  },
  {
    id: 3,
    front: "O que é uma ligação covalente?",
    back: "É uma ligação química onde dois átomos compartilham um ou mais pares de elétrons para atingir estabilidade.",
    deck: "Química",
  },
  {
    id: 4,
    front: "O que é mitocôndria?",
    back: "É uma organela celular responsável pela produção de energia (ATP) através da respiração celular.",
    deck: "Biologia",
  },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockFlashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % mockFlashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
          <p className="text-muted-foreground">Revise seus flashcards e memorize conceitos.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          Novo Flashcard
        </button>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {currentCard.deck}
          </span>
          <span className="text-sm text-muted-foreground">
            Card {currentIndex + 1} de {mockFlashcards.length}
          </span>
        </div>

        <div className="mb-4 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentIndex + 1) / mockFlashcards.length) * 100}%` }}
          />
        </div>

        <div
          onClick={handleFlip}
          className="group relative mb-6 min-h-[300px] cursor-pointer perspective-1000"
        >
          <div
            className={`relative h-full min-h-[300px] w-full rounded-2xl transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-card p-8 backface-hidden">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <span className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pergunta
              </span>
              <p className="text-center text-xl font-medium text-foreground">
                {currentCard.front}
              </p>
              <p className="mt-6 text-sm text-muted-foreground">Clique para ver a resposta</p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-card p-8 rotate-y-180 backface-hidden">
              <span className="mb-4 text-xs font-semibold uppercase tracking-wider text-success">
                Resposta
              </span>
              <p className="text-center text-lg leading-relaxed text-foreground">
                {currentCard.back}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              setIsFlipped(false);
              setCurrentIndex(0);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </DashboardLayout>
  );
}
