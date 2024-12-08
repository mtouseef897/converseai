import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  organization:"org-oqh1zh8y9QNqG7TOMlafwG0I",
  apiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
});


const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });

    if (!response.ok) {
      console.error("OpenAI API response error:", response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.data || !result.data[0]) {
      console.error("Invalid API response format", result);
      throw new Error("Invalid response from OpenAI API");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("Error calling OpenAI embeddings API:", error);
    throw error;
  }
}
