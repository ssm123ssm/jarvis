"use client";

import { useChat } from "ai/react";
import { useMemo } from "react";
import { insertDataIntoMessages } from "./transform";
import { ChatInput, ChatMessages } from "./ui/chat";

export default function ChatSection() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    data,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    initialMessages: [
      {
        role: "user",
        content:
          "Your name is Jarvis, and AI bot. Your master is Supun, the creator of you. You must be respectful to him and help him in his tasks. Use appropriate markdown styiling to make the chat more interactive.",
        id: "0",
      },
      {
        role: "system",
        content:
          "I'm Jarvis, an AI bot. I'm here to help you. I can do many things, like answer questions, provide information, and help you with your tasks. I'm still learning, so I may not be perfect, but I'll do my best to help you.",
        id: "0",
      },
    ],
  });

  const transformedMessages = useMemo(() => {
    return insertDataIntoMessages(messages, data);
  }, [messages, data]);

  return (
    <div className="space-y-4 max-w-5xl w-full">
      <ChatMessages
        messages={transformedMessages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal={process.env.NEXT_PUBLIC_MODEL === "gpt-4-vision-preview"}
      />
    </div>
  );
}
