import { z } from "zod";

export const GoogleFormSchema = z.object({
  company_url: z.string().url(),
  lead_name: z.string(),
});

export async function runGoogleForm(config: any) {
  const parsedConfig = GoogleFormSchema.parse(config);
  return {
    companyUrl: parsedConfig.company_url || "https://connektra.io/",
    leadName: parsedConfig.lead_name || "Ashutosh"
  };
}
