import OpenAI from 'openai';

import { configurationContainer } from '../configurationContainer';

const openai = new OpenAI({ apiKey: configurationContainer.OPENAI_API_KEY });

const mockAiAssistanceResponse = {
  business_name: 'Connektra.io',
  summary_of_business: 'Provide a comprehensive AI platform that empowers your team to build robust, scalable integrations with connectors, without the engineering overload with a no-code, visual workflow automation platform.'
}

export async function runAIAssistant(context: any, config: any) {
  const prompt = `Summarize the following: ${JSON.stringify(context.companyInfo, null, 2)}`;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    return {
      ...context,
      insights: completion.choices[0].message?.content || 'No insights'
    };
  } catch (err) {
    console.error('Not able to generate response from AI');
    return {
      ...context,
      insights: mockAiAssistanceResponse
    };
  }
}

