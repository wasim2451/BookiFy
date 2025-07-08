import { Groq } from 'groq-sdk';
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY , dangerouslyAllowBrowser: true });
export async function getBookDetails(bookname) {
  const chatCompletion = await getGroqChatCompletion(bookname);
  // Print the completion returned by the LLM.
  return (chatCompletion.choices[0]?.message?.content || "");
}
export async function getGroqChatCompletion(bookname) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content:` I am a bookseller. A user wants to know more about a book before deciding to buy.Please provide the following details in simple, engaging language:
                1. A short summary of what the book is about (max 50 words).
                2. The main themes or topics covered.
                3. The type of audience who would enjoy this book.
                4. Why this book might be interesting or valuable to read.
                5. Make it brief enough to read and understand quickly.Not so long to make a user experience bad .
                Avoid spoilers. Be clear and concise. The tone should be friendly, informative, and persuasive.
                Output only the information, without extra commentary or disclaimers. Write all information in simple paragraphs.The book name is ${bookname}. Do not use Groq response or something just return plain text.`
            },
        ],
        model: "llama3-70b-8192",
    })
}