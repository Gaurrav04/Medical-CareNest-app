import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { useRouter } from "next/navigation"; 

// Convert new lines to <br /> for better text formatting
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

// ChatLine Component Props
interface ChatLineProps {
  role: "user" | "assistant";
  content: string;
  sources: string[];
  buttons?: { text: string; value: string; link?: string }[];
  image?: string | null;
  handleButtonClick?: (value: string, link?: string) => void; 
}

export function ChatLine({ role, content, sources, buttons = [], image = null, handleButtonClick }: ChatLineProps) {
  console.log("Rendering ChatLine:", { role, content, buttons, image });

  const router = useRouter(); 

  if (!content) {
    return null;
  }

  const formattedMessage = convertNewLines(content);

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role === "user" ? "text-amber-500 dark:text-amber-200" : "text-blue-500 dark:text-blue-200"
            }
          >
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>{formattedMessage}</Balancer>

          {/* Display Image if Available */}
          {image && (
            <>
              <p className="text-xs text-gray-500">📷 Image received</p>
              <img src={image} alt="Chatbot Image" className="mt-2 rounded-md w-32" />
            </>
          )}

          {buttons.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => {
                    if (button.link) {
                      router.push(button.link); 
                    } else if (handleButtonClick) {
                      handleButtonClick(button.value);
                    }
                  }}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </CardContent>

        {/* Display Sources if Available */}
        {sources.length > 0 && (
          <CardFooter>
            <Accordion type="single" collapsible className="w-full">
              {sources.map((source, index) => (
                <AccordionItem value={`source-${index}`} key={index}>
                  <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                  <AccordionContent>
                    <ReactMarkdown>{formattedText(source)}</ReactMarkdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
