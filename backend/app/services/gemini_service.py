import os
import json
import google.generativeai as genai

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


class GeminiService:

    @staticmethod
    def generate_text(
        prompt: str
    ):

        response = model.generate_content(
            prompt
        )

        return response.text

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

        response = model.generate_content(
            prompt
        )

        return response.text