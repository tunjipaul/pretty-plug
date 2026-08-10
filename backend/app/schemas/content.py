from pydantic import BaseModel
from typing import List


class HeroContent(BaseModel):
    eyebrow: str = "Abeokuta Luxury Suite"
    headline: str = "Best Nails for Best Moments"
    highlight: str = "Best Moments"
    body: str = (
        "Loved by beauty minimalists and curated for the meticulous. "
        "Step into an era of editorial beauty where every finish is personal."
    )
    primaryCta: str = "Book Appointment"
    secondaryCta: str = "View Portfolio"


class MetricItem(BaseModel):
    value: str
    label: str


class TrustMetricsContent(BaseModel):
    items: List[MetricItem] = [
        {"value": "500+", "label": "Happy Clients"},
        {"value": "3+", "label": "Years Excellence"},
        {"value": "5", "label": "Star Reviews"},
        {"value": "1", "label": "Certified Master"},
    ]


class ContentPayload(BaseModel):
    hero: HeroContent
    trustMetrics: TrustMetricsContent = TrustMetricsContent()
