import 'dotenv/config';

import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const client = new OpenAI();

async function init() {
  const stream = await client.responses.create({
    model: 'gpt-5.5',
    stream: true,
    input: `
      Extract the risks from the following document

      Document:
      Our company recently launched a new software platform. 
      The platform relies on several third-party APIs that may experience downtime. 
      In addition, we are storing customer data in the cloud, and there are strict 
      regulatory requirements regarding data privacy and protection. 
      Some features are still in beta and could potentially introduce bugs 
      that affect user experience. 

      Please list any risks you find in the document above.
    `,
  });

  for await (const event of stream) {
    // console.log(event);/
    if (event && event.delta){
        process.stdout.write(event.delta);
    }
  }
}

init();