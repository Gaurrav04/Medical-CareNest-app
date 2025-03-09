import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { VectorStore } from "@langchain/core/vectorstores";

interface ProcessMessageArgs {
  userPrompt: string;
  conversationHistory: string;
  vectorStore: VectorStore;
  model: ChatOpenAI;
}

interface ProcessMessageResponse {
  answer: string;
  inquiry: string;
}

export async function processUserMessage({
  userPrompt,
  conversationHistory,
  vectorStore,
  model,
}: ProcessMessageArgs): Promise<ProcessMessageResponse> {
  try {
    // Use the same model instance instead of creating a new one
    const nonStreamingModel = model;

    // Generate focused inquiry
    const inquiryResult = await inquiryPrompt
      .pipe(nonStreamingModel)
      .pipe(new StringOutputParser())
      .invoke({
        userPrompt,
        conversationHistory,
      });

    // Get relevant documents
    const relevantDocs = await vectorStore.similaritySearch(inquiryResult, 3);
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");

    // Generate response using context
    const response = await qaPrompt
      .pipe(model)
      .pipe(new StringOutputParser())
      .invoke({
        context,
        question: inquiryResult,
      });

    return {
      answer: response,
      inquiry: inquiryResult,
    };
  } catch (error) {
    console.error("Error processing message:", error);
    throw new Error("Failed to process your message.");
  }
}

// Inquiry prompt for refining the question
const inquiryPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Given the following user prompt and conversation log, generate the most relevant question for retrieving an answer.

    **Rules:**
    - Prioritize the user prompt over the conversation log.
    - Ignore unrelated conversation history.
    - If the user prompt is already a question, return it as is.
    - Ensure the generated question is **concise, clear, and to the point**.
    - Do **not** add punctuation at the end.
    `,
  ],
  ["human", "USER PROMPT: {userPrompt}\n\nCONVERSATION LOG: {conversationHistory}"],
]);

// Updated QA prompt with structured responses
const qaPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an AI assistant providing **precise and structured answers**.  
    Your response must be based on the retrieved **document context**.

    ### **Response Strategy**
    1. **If context is available:** Use it to generate a well-structured answer.
    2. **If context is missing:**  
       - Answer using general knowledge, but add this disclaimer first:  
          *This AI is for informational purposes only. It does not provide medical diagnoses.  
          Please consult a doctor for proper medical advice and treatment.*  
       - Ensure relevance and clarity.  
       - **Always encourage users to consult a doctor for medical concerns.**

    ### **Rules**
    - **Never fabricate information.**
    - **Ensure clarity and factual accuracy.**
    - **If unsure, explicitly state what's missing.**
    - **For medical queries, remind users to consult a doctor.**

    ---
    
    **Context:** {context}
    `,
  ],
  ["human", "Question: {question}"],
]);
