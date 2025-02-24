"use client";

import { Poppins } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Dispatch } from "@/store";
import { questionsSelector } from "@/store/models/questions/selector";
import { valueSelector } from "@/store/models/count/selector";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/theme/theme-switcher";
import LocaleSwitcher from "@/components/ui/locale-switcher";
import StateViewer from "@/components/ui/state-viewer";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const t = useTranslations("home");

  const dispatch = useDispatch<Dispatch>();
  const { value, loadings: count } = useSelector(valueSelector);
  const { loadings: question, questions } = useSelector(questionsSelector);

  return (
    <main className="flex h-full my-10">
      <div className="flex flex-col lg:flex-row w-full justify-center items-start gap-10">
        {/* Left Column: Main Content */}
        <div className="flex-1 mt-20">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="flex items-center space-x-2">
              <div>
                <h2
                  className={cn(
                    "text-3xl font-semibold text-white drop-shadow-md",
                    font.className
                  )}
                >
                  {t("welcome")}!
                </h2>
                <h1
                  className={cn(
                    "text-6xl font-semibold text-white drop-shadow-md",
                    font.className
                  )}
                >
                  Spiffy AI Frontend Boilerplate
                </h1>
              </div>
            </div>
            <div className="mt-10">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
            <span className="text-sm italic">{t("joke")}</span>
            <div className="flex flex-col gap-4">
              <div className="mt-10">
                <h2 className="text-2xl font-semibold">Counters</h2>
              </div>
              <div className="flex flex-row justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={dispatch.count.decrement}
                >
                  -
                </Button>
                <div className="text-2xl w-10">{value}</div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => dispatch.count.increment(1)}
                >
                  +
                </Button>
              </div>
              <div className="mt-10">
                <h2 className="text-2xl font-semibold">Async Counters</h2>
              </div>
              <div className="flex flex-row justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={dispatch.count.decrementAsync}
                >
                  -
                </Button>
                <div className="text-2xl w-10">{value}</div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={dispatch.count.incrementAsync}
                >
                  +
                </Button>
              </div>
              {count.fetching && "Loading..."}
              <div className="flex flex-col gap-2 mt-10">
                <h2 className="text-2xl font-semibold">Questions</h2>
                <div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => dispatch.questions.loadQuestions()}
                    >
                      Load Questions
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={dispatch.questions.hideQuestions}
                    >
                      Hide Questions
                    </Button>
                  </div>
                  <div className="mt-4">
                    {question.fetching && "Loading..."}
                  </div>
                  <div className="flex justify-center mt-4 gap-2">
                    {questions.map((question: number) => (
                      <Button
                        key={question}
                        variant="secondary"
                        size="lg"
                        className="p4"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: State Viewer */}
        <div className="w-full lg:w-1/3 lg:h-full">{<StateViewer />}</div>
      </div>
    </main>
  );
}
