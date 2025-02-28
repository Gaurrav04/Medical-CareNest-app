"use client";

import { useChat, Message } from "@ai-sdk/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-line";
import { Loader2 } from "lucide-react";
import { scrollToBottom, initialMessages } from "@/lib/utils";

export function Chat() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages,
  });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef as React.RefObject<HTMLElement>), 100);
  }, [messages]);

  return (
    <div className="rounded-2xl border h-[60vh] flex flex-col justify-between">
      <div className="p-4 overflow-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message) => (
          <ChatLine key={id} role={role} content={content} sources={[]} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex">
        <Input
          value={input}
          placeholder={"Ask the AI Assistant..."}
          onChange={handleInputChange}
          className="mr-2"
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-24">
            Ask
          </Button>
        )}
      </form>
    </div>
  );
}
