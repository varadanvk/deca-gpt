"use client"

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

type CardSectionProps = {
  children: ReactNode;
  className?: string;
};

const CardHeader = ({ children }: { children: ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardTitle = ({ children, className = "" }: CardSectionProps) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }: { children: ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main content fills remaining space */}
      <main className="flex-grow">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                DECAGPT
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Perfect your DECA roleplay skills with AI-powered practice scenarios and detailed feedback
              </p>
            </div>

            {/* Try It Out button section with rotating gradient */}
            <div className="flex justify-center my-12">
              <div className="relative group">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 'calc(100% + 16px)',
                    height: 'calc(100% + 16px)',
                    top: '-8px',
                    left: '-8px',
                    background: 'linear-gradient(45deg, #2563eb, #14b8a6, #9333ea, #2563eb)',
                    filter: 'blur(12px)',
                    animation: 'rotateColors 3s linear infinite'
                  }}
                />
                <Link
                  href="/practice"
                  className="relative z-10 px-8 py-4 text-lg font-semibold text-white bg-black rounded-full transition-transform duration-300 hover:scale-110 group flex items-center gap-2"
                >
                  Try It Out <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <style jsx>{`
                @keyframes rotateColors {
                  0% {
                    filter: blur(12px) hue-rotate(0deg);
                  }
                  100% {
                    filter: blur(12px) hue-rotate(360deg);
                  }
                }
              `}</style>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    AI-Generated Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get realistic DECA roleplay scenarios tailored to your chosen event
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-purple-600">Voice Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Practice speaking naturally with our voice recording feature
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-blue-600">Detailed Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive comprehensive scoring and improvement suggestions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with scrolling credits */}
      <footer className="bg-gray-100 border-t py-8 text-center">
        <div className="flex flex-col items-center space-y-4 px-4">
          <p className="text-gray-700 font-semibold">
            Made by Amador Valley High School DECA
          </p>
          <div className="w-full overflow-hidden">
            <div className="animate-scroll whitespace-nowrap">
              <span className="text-gray-600 inline-block">
                Rikhil Damarla • Siddarth Karthik • Chak (Jeremy) Li • Varadan Kalkunte • Aarush Tahiliani • Rikhil Damarla • Siddarth Karthik • Chak (Jeremy) Li • Varadan Kalkunte • Aarush Tahiliani • Rikhil Damarla • Siddarth Karthik • Chak (Jeremy) Li •
              </span>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
        `}</style>
      </footer>
    </div>
  );
}
