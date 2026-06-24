import os
import requests
from bs4 import BeautifulSoup
import json
from app.repositories.lead_repository import (LeadRepository)

from app.services.gemini_service import (
    GeminiService
)

GNEWS_API_KEY = os.getenv(
    "GNEWS_API_KEY"
)

class SignalService:

    @staticmethod
    def extract_article_text(
        url: str
    ):
        try:

            response = requests.get(
                url,
                timeout=10,
                headers={
                    "User-Agent":
                    "Mozilla/5.0"
                }
            )

            soup = BeautifulSoup(
                response.text,
                "html.parser"
            )

            paragraphs = soup.find_all(
                "p"
            )

            content = "\n".join(
                p.get_text(strip=True)
                for p in paragraphs
            )

            return content[:2000]

        except Exception as e:

            print(
                "Article extraction failed:",
                e
            )

            return ""

    @staticmethod
    def get_news(

        industry: str,
        region: str,
        db

    ):

        query = f"{industry} {region}"

        url = (
            "https://gnews.io/api/v4/search"
        )

        params = {
            "q": query,
            "lang": "en",
            "max": 3,
            "apikey": GNEWS_API_KEY
        }

        response = requests.get(
            url,
            params=params
        )

        data = response.json()

        articles = data.get(
            "articles",
            []
        )
        print("GNEWS RESPONSE:")
        print(data)

        print("ARTICLE COUNT:")
        print(len(articles))

        news_text = ""

        for article in articles:

            article_url = article.get(
                "url",
                ""
            )

            article_text = (
                SignalService
                .extract_article_text(
                    article_url
                )
            )

            news_text += f"""

TITLE:
{article.get('title', '')}

DESCRIPTION:
{article.get('description', '')}

FULL ARTICLE:
{article_text}

=================================

"""

        prompt = f"""
        You are a GTM Intelligence Analyst.

        Analyze the news.

        Return ONLY valid JSON.

        {{
            "signal": "",
            "opportunity": "",
            "industry": "",
            "target_companies": [],
            "buying_trigger": "",
            "recommended_action": ""
        }}

        IMPORTANT:

        Extract REAL company names mentioned in the article.

        If companies are not explicitly mentioned,
        return likely buyer companies.

        DO NOT return categories.

        GOOD:

        [
        "Siemens Energy",
        "RWE",
        "Ørsted",
        "Vestas"
        ]

        BAD:

        [
        "Renewable Energy Companies",
        "Battery Manufacturers"
        ]

        NEWS:

        {news_text}
        """

        analysis = (
            GeminiService
            .generate_text(
                prompt
            )
        )

        analysis = analysis.replace(
            "```json",
            ""
        )

        analysis = analysis.replace(
            "```",
            ""
        )

        try:

            parsed_analysis = json.loads(
                analysis
            )

        except Exception:

            parsed_analysis = {
                "raw_analysis": analysis
            }

        companies = parsed_analysis.get(
            "target_companies",
            []
        )

        matched_leads = (
            SignalService.match_leads(
                db=db,
                companies=companies
            )
        )

        articles_summary = []

        for article in articles:

            articles_summary.append({
                "title": article.get("title"),
                "url": article.get("url"),
                "source": (
                    article.get("source", {})
                    .get("name")
                ),
                "published_at": article.get(
                    "publishedAt"
                )
            })

        return {
            "articles": articles_summary,
            "signal_analysis": parsed_analysis,
            "matched_leads": matched_leads
        }
    
    @staticmethod
    def match_leads(
        db,
        companies
    ):

        all_leads = (
            LeadRepository.get_all_leads(
                db
            )
        )

        matches = []

        for lead in all_leads:

            for company in companies:

                if (
                    lead.company
                    and (
                        company.lower()
                        in lead.company.lower()
                        or
                        lead.company.lower()
                        in company.lower()
                    )
                ):

                    matches.append({
                        "name": lead.full_name,
                        "company": lead.company,
                        "headline": lead.headline
                    })

        return matches