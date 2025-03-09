import { NextRequest, NextResponse } from "next/server";
import { Message } from "ai";
import { getVectorStore } from "@/lib/vector-store";
import { ChatOpenAI } from "@langchain/openai";
import { processUserMessage } from "@/lib/langchain";
import { getPineconeClient } from "@/lib/pinecone-client";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    console.log("Chatbot API Hit");

    // Parse request body
    const body = await req.json();
    console.log("Request Body:", JSON.stringify(body, null, 2));

    const messages: Message[] = body.messages ?? [];
    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const currentQuestion = messages[messages.length - 1]?.content?.toLowerCase().trim();
    if (!currentQuestion) {
      return NextResponse.json({ error: "Empty question provided" }, { status: 400 });
    }

    // Welcome Message
    if (["hi", "hello", "hey"].includes(currentQuestion)) {
      return NextResponse.json({
        text: "Welcome to CareNest-Medical! How can I assist you today?",
        buttons: [
          { text: "Doctor Details", value: "doctor_details" },
          { text: "Book Appointment", value: "book_appointment" },
        ],
        image: "/logo.png",
      });
    }

    // Doctor Details (Now Includes Book Appointment)
    if (currentQuestion === "doctor_details") {
      return NextResponse.json({
        text: "What kind of doctor are you looking for?",
        buttons: [
          { text: "By Service", value: "doctor_service" },
          { text: "By Specialty", value: "doctor_specialty" },
          { text: "By Symptoms", value: "doctor_symptom" },
        ],
      });
    }

    // Service, Specialty, and Symptom Selection
    if (currentQuestion === "doctor_service") {
      return NextResponse.json({
        text: "Select a medical service:",
        buttons: [
          { text: "Family Care", value: "/service/family-care" },
          { text: "Mental Health", value: "/service/mental-health-consult" },
          { text: "Telehealth", value: "/service/telehealth" },
        ],
      });
    }

    if (currentQuestion === "doctor_specialty") {
      return NextResponse.json({
        text: "Select a medical specialty:",
        buttons: [
          { text: "Women Health", value: "/specialty/women-health" },
          { text: "Men Health", value: "/specialty/men-health" },
          { text: "Dermatology", value: "/specialty/dermatology" },
        ],
      });
    }

    if (currentQuestion === "doctor_symptom") {
      return NextResponse.json({
        text: "Select a symptom:",
        buttons: [
          { text: "Acne", value: "/symptoms/acne?id=18" },
          { text: "Fever", value: "/symptoms/fever?id=1" },
          { text: "Depression", value: "/symptoms/depression?id=6" },
        ],
      });
    }

    // Book Appointment (Now Shows Buttons Instead of Redirecting)
    if (currentQuestion === "book_appointment") {
      return NextResponse.json({
        text: "Would you like a Telehealth Consultation or an In-Person Visit?",
        buttons: [
          { text: "Telehealth Consultation", value: "/category?mode=Telehealth%20Visit" },
          { text: "In-Person Visit", value: "/category?mode=In-Person%20Doctor%20visit" },
        ],
      });
    }

    // Medicine Inquiry (Uses RAG)
    if (currentQuestion.includes("uses") || currentQuestion.includes("side effects")) {
      console.log("Medicine inquiry detected...");

      const pc = await getPineconeClient();
      const vectorStore = await getVectorStore(pc);

      const response = await processUserMessage({
        userPrompt: currentQuestion,
        conversationHistory: "",
        vectorStore,
        model: new ChatOpenAI({ modelName: "gpt-3.5-turbo" }),
      });

      return NextResponse.json({
        text: response.answer, // Only returns AI-generated answer
      });
    }

    // General Queries (Send to RAG)
    console.log("Processing message through AI & RAG...");

    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo", streaming: true });
    const pc = await getPineconeClient();
    const vectorStore = await getVectorStore(pc);

    const response = await processUserMessage({
      userPrompt: currentQuestion,
      conversationHistory: "",
      vectorStore,
      model,
    });

    console.log("AI Response:", response.answer);

    return NextResponse.json({ text: response.answer });

  } catch (error) {
    console.error("Chat endpoint error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
