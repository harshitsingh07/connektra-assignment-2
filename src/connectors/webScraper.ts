import { extractDomain } from "../utils/extractDomain";

const mock_company_description = "A leading tech company";

export async function runWebScraper(context: any, config: any) {
  const companyName = extractDomain(context.companyUrl as string);
  return {
    ...context,
    companyInfo: {
      name: companyName,
      description: mock_company_description,
      services: ["Web", "AI"]
    }
  };
}
