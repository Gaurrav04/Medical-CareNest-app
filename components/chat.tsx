"use client";

import { useChat, Message as BaseMessage } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-line";
import { Loader2 } from "lucide-react";
import { scrollToBottom, initialMessages } from "@/lib/utils";

// Define message types
interface UserMessage {
  role: "user";
  content: string;
}

interface AIResponseMessage {
  role: "assistant";
  content: string;
  buttons?: { text: string; value: string }[];
  sources?: string[]; 
}
export function Chat() {
  console.log(" Chat component rendered");

  const containerRef = useRef<HTMLDivElement>(null!);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    initialMessages,
  });

  useEffect(() => {
    console.log("Messages updated:", messages);
    setTimeout(() => {
      scrollToBottom(containerRef);
    }, 100);
  }, [messages]);

  const handleButtonClick = async (value: string) => {
    console.log("Button clicked:", value);
  
    // Direct URL redirection (if value is a valid route)
    if (value.startsWith("/")) {
      window.location.href = value;
      return;
    }
  
    const userMessage: UserMessage = { role: "user", content: value };
    handleInputChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    append(userMessage);
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to fetch AI response");
  
      const data = await response.json();
  
      // Check if API sent a redirection
      if (data.redirect && data.redirect.url) {
        console.log(" Redirecting to:", data.redirect.url);
        window.location.href = data.redirect.url; // Perform redirection
        return;
      }
  
      //  If no redirect, process AI response normally
      const aiMessage: AIResponseMessage = {
        role: "assistant",
        content: data.text,
        buttons: data.buttons || [],
        sources: data.sources || [],
      };
  
      setTimeout(() => append(aiMessage), 0);
    } catch (error) {
      console.error("Chat API error:", error);
      append({ role: "assistant", content: "Sorry, I couldn't process that request." });
    }
  };
  
  return (
    <div className="rounded-2xl border h-[60vh] flex flex-col justify-between">
      <div className="p-4 overflow-auto" ref={containerRef}>
        {messages
          .filter((msg) => msg.role === "user" || msg.role === "assistant")
          .map((msg, index) => (
            <ChatLine
              key={index}
              role={msg.role as "user" | "assistant"}
              content={msg.content}
              buttons={"buttons" in msg && Array.isArray(msg.buttons) ? msg.buttons : []}
              sources={"sources" in msg && Array.isArray(msg.sources) ? msg.sources : []}
              handleButtonClick={handleButtonClick}
            />
          ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          handleButtonClick(input);
        }}
        className="p-4 flex"
      >
        <Input
          value={input}
          placeholder="Ask the AI Assistant..."
          onChange={handleInputChange}
          className="mr-2"
        />
        <Button type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
