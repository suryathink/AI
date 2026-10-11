import 'dotenv/config';
import OpenAi from 'openai';

const client = new OpenAi(); // it will automatically use the OPENAI_API_KEY environment variable

async function init() {
    const result = await client.responses.create({
    model:"gpt-4.1-mini",
    input:"hey there, My name is surya.",
    })

    console.log(result.output_text);
}
init();

