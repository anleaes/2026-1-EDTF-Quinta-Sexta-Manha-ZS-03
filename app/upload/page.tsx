"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Upload, FileText, Sparkles, CreditCard, X } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleGenerateSummary = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSummary(`# Resumo: ${file?.name}

## Principais Conceitos

1. **Introdução ao Tema**
   O documento apresenta os conceitos fundamentais sobre o assunto, estabelecendo uma base teórica sólida para compreensão.

2. **Desenvolvimento Teórico**
   São exploradas as principais teorias e frameworks relacionados, com exemplos práticos de aplicação.

3. **Metodologia**
   Descrição detalhada dos métodos utilizados para análise e validação dos conceitos apresentados.

4. **Resultados e Discussão**
   Apresentação dos principais achados e sua relevância para o campo de estudo.

5. **Conclusões**
   Síntese das principais contribuições e sugestões para estudos futuros.`);
      setIsProcessing(false);
    }, 2000);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSummary(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Upload PDF</h1>
        <p className="text-muted-foreground">
          Faça upload do seu PDF para gerar resumos e flashcards com IA.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-card p-8 transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            {file ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <p className="mb-1 font-medium text-foreground">{file.name}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={handleRemoveFile}
                  className="flex items-center gap-1 text-sm text-destructive hover:underline"
                >
                  <X className="h-4 w-4" />
                  Remover arquivo
                </button>
              </div>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mb-2 text-lg font-medium text-foreground">
                  Arraste seu PDF aqui
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  ou clique para selecionar um arquivo
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  Selecionar Arquivo
                </label>
              </>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleGenerateSummary}
              disabled={!file || isProcessing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles className="h-5 w-5" />
              {isProcessing ? "Gerando..." : "Gerar Resumo com IA"}
            </button>
            <button
              onClick={() => router.push("/flashcards-ia")}
              disabled={!file}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CreditCard className="h-5 w-5" />
              Criar Flashcards
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Resumo IA</h2>
          </div>
          
          {summary ? (
            <div className="prose prose-invert max-w-none">
              <div className="space-y-4 text-sm text-foreground">
                {summary.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-foreground">
                        {line.replace("# ", "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h4 key={index} className="mt-6 text-lg font-semibold text-primary">
                        {line.replace("## ", "")}
                      </h4>
                    );
                  }
                  if (line.match(/^\d+\./)) {
                    const content = line.replace(/^\d+\.\s*/, "");
                    const boldMatch = content.match(/\*\*(.*?)\*\*/);
                    if (boldMatch) {
                      return (
                        <div key={index} className="mt-4">
                          <p className="font-semibold text-foreground">{boldMatch[1]}</p>
                        </div>
                      );
                    }
                    return <p key={index}>{content}</p>;
                  }
                  if (line.trim() && !line.startsWith("**")) {
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {line.trim()}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Faça upload de um PDF e clique em &quot;Gerar Resumo com IA&quot; para ver o resumo aqui.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
