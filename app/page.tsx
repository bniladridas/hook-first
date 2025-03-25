'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { generateInference, PersonalityType } from '@/lib/gemini';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Progress } from '@/components/ui/progress';
import { PersonalitySelector } from '@/components/personality-selector';
import { ProfileForm } from '@/components/profile-form';
import { SocialLinks } from '@/components/social-links';
import { AnimatedLogo } from '@/components/animated-logo';
import { BatteryStatus } from '@/components/battery-status';

export default function Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const [personality, setPersonality] = useState<PersonalityType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      setOutput("*sigh* ... you haven't even typed anything.");
      return;
    }

    if (!personality) {
      setOutput("Please choose a personality first.");
      return;
    }

    try {
      setLoading(true);
      setProgress(20);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const result = await generateInference(input, personality);
      
      clearInterval(progressInterval);
      setProgress(100);
      setOutput(result);
      
      setTimeout(() => {
        setProgress(0);
      }, 500);
      
    } catch (error: any) {
      console.error('Error:', error);
      setOutput("Ugh, something went wrong. Not that I care.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-2 sm:px-4 min-h-screen bg-neutral-950">
      <div className="flex flex-col items-center space-y-4 py-4 md:py-12">
        {/* Battery Status */}
        <div className="w-full max-w-2xl flex justify-end mb-2">
          <BatteryStatus />
        </div>

        {/* Main input box */}
        <div className="w-full max-w-2xl bg-neutral-900 rounded-none border border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-2 sm:p-4 border-b border-neutral-800">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <AnimatedLogo />
              <span className="text-neutral-400 text-sm font-mono">Hook First</span>
            </div>
            
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <ProfileForm />
              <PersonalitySelector onSelect={personality => setPersonality(personality)} />
              <SocialLinks />
            </div>
          </div>
          
          <div className="p-2 sm:p-4">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your text here..."
              className="w-full min-h-[120px] bg-neutral-950 text-neutral-100 p-2 sm:p-4 font-mono text-sm border-none focus:outline-none focus:ring-0 resize-none"
              style={{ height: 'auto' }}
            />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-4">
              <div className="flex items-center gap-4 text-xs text-neutral-600 font-mono">
                <span>{input.length} characters</span>
                <span>⌘ + ⇧ + ↵</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="w-full sm:w-auto px-4 py-2 bg-neutral-800 text-neutral-300 text-sm font-mono hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'processing...' : 'generate →'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="w-full max-w-2xl space-y-2">
            <Progress 
              value={progress} 
              className="h-1 bg-neutral-800" 
            />
            <p className="text-sm text-neutral-600 text-center font-mono">
              processing... i guess
            </p>
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="w-full max-w-2xl p-2 sm:p-4 bg-neutral-900 border border-neutral-800">
            <div className="text-xs text-neutral-600 mb-2 font-mono">response:</div>
            <div className="text-neutral-300 font-mono prose prose-invert prose-sm max-w-none break-words">
              <MarkdownRenderer content={output} />
            </div>
          </div>
        )}

        {/* Attribution Footer */}
        <footer className="w-full max-w-2xl mt-8 border-t border-neutral-800 pt-4">
          <div className="flex flex-col items-center gap-4 px-2">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <span>Powered by</span>
                <a 
                  href="https://ai.google/discover/palm2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors"
                >
                  Google PaLM 2
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
