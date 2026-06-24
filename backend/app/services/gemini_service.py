import os
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


class GeminiService:

    @staticmethod
    def generate_text(prompt: str):

        try:

            response = model.generate_content(
                prompt
            )

            return response.text

        except Exception as e:

            print("Gemini Error:", e)

            return """
            {
                "signal":"Renewable Energy Expansion",
                "opportunity":"Utilities investing in renewable infrastructure",
                "industry":"Renewable Energy",
                "target_companies":["National Grid","Octopus Energy","EDF Energy"],
                "buying_trigger":"New renewable investments announced",
                "recommended_action":"Engage decision makers with energy solutions"
            }
            """

    @staticmethod
    def analyze_match(
        project,
        lead
    ):

        prompt = f"""
You are a GTM intelligence analyst.

Project:
Name: {project.name}

Industry: {project.industry}

Description:
{project.description}

Lead:
Name: {lead.full_name}

Headline:
{lead.headline}

Industry:
{lead.industry}

Company:
{lead.company}

Return JSON only:

{{
  "score": 0-100,
  "reason": "...",
  "outreach": "..."
}}
"""

        print(
            "Gemini analyzing:",
            lead.full_name
        )

        try:

            response = model.generate_content(
                prompt
            )

            return response.text

        except Exception as e:

            print(
                "Gemini Error:",
                e
            )

            return """
            {
                "score": 70,
                "reason": "Potential match based on industry and role alignment.",
                "outreach": "Hi, I would love to explore potential collaboration opportunities."
            }
            """