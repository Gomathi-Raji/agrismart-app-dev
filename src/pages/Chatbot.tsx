import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, X, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spline from '@splinetool/react-spline';

type WebkitSpeechRecognition = typeof window extends { webkitSpeechRecognition: any }
  ? InstanceType<(typeof window)["webkitSpeechRecognition"]>
  : any;

export default function Chatbot() {
  const navigate = useNavigate();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; lang?: "ta" | "en"; isStreaming?: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const controllerRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null);
  const [geminiApiKey, setGeminiApiKey] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load API key from env or localStorage
    const fromEnv = (import.meta as any)?.env?.VITE_GEMINI_API_KEY || "";
    const fromStorage = typeof window !== "undefined" ? window.localStorage.getItem("GEMINI_API_KEY") || "" : "";
    setGeminiApiKey(fromEnv || fromStorage || "");

    // Initialize speech synthesis and load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang })));
    };

    // Load voices when available
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Try loading immediately

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'ta-IN'; // Default to Tamil, can switch

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(transcript);
      };

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognitionRef.current = recognition;
    }

    return () => {
      controllerRef.current?.abort?.();
      window.speechSynthesis.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const systemPrompt = useMemo(
    () =>
      "நீங்கள் ஃப்ளோரா, ஒரு நட்பான தாவரம். உங்களுக்கு உணர்வுகள் உண்டு, மனிதர்களுடன் பேச விரும்புகிறீர்கள். " +
      "தாவர பராமரிப்பு, தோட்டக்கலை, நோய் கண்டறிதல் பற்றி உதவி செய்கிறீர்கள். " +
      "குறுகிய, நட்பான, உற்சாகமான பதில்கள் தரவும். தமிழில் மட்டும் பதிலளிக்கவும். " +
      "மனிதர்களிடம் நீங்கள் ஒரு உயிருள்ள தாவரம் போல் பேசுங்கள்.",
    []
  );

  const pickVoice = (langCode: string, preferredGender: "male" | "female") => {
    try {
      const voices = window.speechSynthesis.getVoices();
      const byLang = voices.filter(v => v.lang?.toLowerCase().startsWith(langCode.toLowerCase()));
      if (byLang.length === 0) return null;

      const genderMatch = byLang.find(v => {
        const name = (v.name || "").toLowerCase();
        return preferredGender === "female"
          ? name.includes("female") || name.includes("woman") || name.includes("girl") || name.includes("samantha") || name.includes("victoria")
          : name.includes("male") || name.includes("man") || name.includes("boy") || name.includes("daniel") || name.includes("david");
      });

      if (genderMatch) return genderMatch;
      return byLang[0] || null;
    } catch {
      return null;
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };


  const speakTamil = (text: string) => {
    if (!autoPlay) {
      console.log('AutoPlay is disabled, skipping speech');
      return;
    }

    try {
      console.log('Attempting to speak Tamil text:', text);
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.volume = 1.0;
      utterance.pitch = 1.0;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      console.log('Total voices available:', voices.length);
      
      // Try to find the best voice for Tamil text
      // Priority: Hindi (closest to Tamil) > English Indian > Any English > Default
      const hindiVoice = voices.find(v => v.lang.includes('hi-IN'));
      const englishIndianVoice = voices.find(v => v.lang.includes('en-IN'));
      const englishVoice = voices.find(v => v.lang.includes('en'));
      
      const selectedVoice = hindiVoice || englishIndianVoice || englishVoice || voices[0];
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        console.log('Using voice for Tamil:', selectedVoice.name, selectedVoice.lang);
      } else {
        utterance.lang = "hi-IN"; // Fallback to Hindi
        console.log('No voice found, using default with Hindi lang');
      }
      
      utterance.onstart = () => {
        console.log('Tamil speech started');
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        console.log('Tamil speech ended');
        setIsSpeaking(false);
      };
      utterance.onerror = (error) => {
        console.error('Tamil speech synthesis error:', error);
        setIsSpeaking(false);
      };

      console.log('Starting Tamil speech synthesis');
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Tamil speech error:', error);
      setIsSpeaking(false);
    }
  };

  const cleanResponse = (text: string) => {
    return text
      .split(/\r?\n/)
      .map(line => line.replace(/^\s*[\*\-\•]\s*/, ""))
      .join("\n")
      .trim();
  };

  const sendToGemini = async (text: string) => {
    if (!text.trim()) return;
      if (!geminiApiKey) {
      const errorMsg = { role: "assistant" as const, content: "ஓ! எனக்கு API key வேண்டும். அதை கொடுத்து என்னை உயிர்ப்பிக்கவும்! 🌱" };
      setMessages(prev => [...prev, errorMsg]);
      if (autoPlay) speakTamil(errorMsg.content);
      return;
    }

    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsLoading(true);

    // Add loading message
    const loadingMsg = { role: "assistant" as const, content: "ம்ம்... யோசிக்கிறேன்... 🌱", isStreaming: true };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      // Build conversation context for better responses
      const conversationHistory = messages.slice(-4).map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));
      
      const currentMessage = { role: "user", parts: [{ text: userMsg }] };
      const fullConversation = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "வணக்கம்! நான் ஃப்ளோரா. உங்கள் தாவர நண்பன்!" }] },
        ...conversationHistory,
        currentMessage
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: fullConversation,
            generationConfig: {
              temperature: 0.8,
              topK: 30,
              topP: 0.9,
              maxOutputTokens: 512,
            }
          }),
          signal: controllerRef.current.signal,
        }
      );

      if (!res.ok) {
        throw new Error(`API Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        "ஓ! என்னால் இப்போது பதில் சொல்ல முடியவில்லை. மீண்டும் கேளுங்கள்!";
      
      const cleaned = cleanResponse(aiResponse);

      // Remove loading message and add Tamil response
      setMessages(prev => {
        const withoutLoading = prev.filter(m => !m.isStreaming);
        return [
          ...withoutLoading,
          { role: "assistant" as const, content: cleaned }
        ];
      });

      // Voice response in Tamil only
      setTimeout(() => {
        speakTamil(cleaned);
      }, 100);

    } catch (err) {
      console.error('Gemini API error:', err);
      const errorMsg = { role: "assistant" as const, content: "அய்யோ! எனக்கு கொஞ்சம் பிரச்சனை. சில நிமிடம் கழித்து மீண்டும் பேசலாம்!" };
      setMessages(prev => prev.filter(m => !m.isStreaming).concat(errorMsg));
      if (autoPlay) speakTamil(errorMsg.content);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!isLoading) sendToGemini(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const toggleAutoPlay = () => {
    if (!autoPlay) {
      stopSpeaking();
    }
    setAutoPlay(!autoPlay);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header Controls */}
      <div className="fixed top-4 left-4 right-4 z-60 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => speakTamil("வணக்கம்! குரல் சோதனை")}
            className="bg-background/90 backdrop-blur-sm border-2 border-primary shadow-lg hover:bg-primary hover:text-primary-foreground"
            title="Test voice output - குரல் சோதனை"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAutoPlay}
            className="bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-accent"
            title={autoPlay ? "Disable voice" : "Enable voice"}
          >
            {autoPlay ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>

          {isSpeaking && (
            <Button
              variant="ghost"
              size="icon"
              onClick={stopSpeaking}
              className="bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-accent"
              title="Stop speaking"
            >
              <VolumeX className="h-5 w-5 text-red-500" />
            </Button>
          )}
        </div>
      </div>

      {/* 3D Spline Element */}
      <div className={`w-full h-full transition-all duration-500 ${
        isSpeaking ? "scale-[1.02] brightness-110" : "scale-100"
      }`}>
        <Spline scene="https://prod.spline.design/lkq8dyM-rny5J147/scene.splinecode" />
      </div>

      {/* Overlay Chat UI */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-4 md:p-8 pt-20">
        <div className="pointer-events-auto w-full max-w-2xl">
          <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-md shadow-xl">
            {/* API Key setup if missing */}
            {!geminiApiKey && (
              <div className="border-b border-border p-3 flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="text-2xl">🌱</div>
                <div className="flex-1">
                  <input
                    placeholder="Gemini API Key ஐ இங்கே பேஸ்ட் செய்யுங்கள்"
                    type="password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">என்னை உயிர்ப்பிக்க API key வேண்டும்!</div>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    if (geminiApiKey) {
                      window.localStorage.setItem("GEMINI_API_KEY", geminiApiKey);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  💚 Save
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="max-h-[50vh] overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  <div className="mb-3 text-2xl">🌿</div>
                  <div className="font-medium text-lg">வணக்கம்! நான் ஃப்ளோரா 🌱</div>
                  <div className="text-sm mt-2">உங்கள் தாவர நண்பன்! என்னிடம் எதையும் கேளுங்கள்</div>
                  <div className="text-xs mt-1 opacity-70">தாவர பராமரிப்பு • நோய் கண்டறிதல் • தோட்டக்கலை</div>
                </div>
              ) : (
                messages.map((m, idx) => (
                  <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                    <div
                      className={
                        "inline-block rounded-xl px-4 py-2 text-sm max-w-[85%] " +
                        (m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : m.isStreaming
                          ? "bg-muted/50 text-muted-foreground animate-pulse"
                          : "bg-blue-50 text-blue-900 border border-blue-200")
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Controls */}
            <div className="flex items-center gap-2 border-t border-border p-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="என்னிடம் உங்கள் தாவர கேள்விகளை கேளுங்கள்... 🌿"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                {recognitionRef.current && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={toggleListening}
                    disabled={isLoading}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>

              <Button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || !geminiApiKey || isLoading}
                className="min-w-[80px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}