from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any


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
    imageUrl: Optional[str] = None

    class Config:
        extra = "allow"


class MetricItem(BaseModel):
    value: str
    label: str

    class Config:
        extra = "allow"


class TrustMetricsContent(BaseModel):
    items: List[MetricItem] = [
        {"value": "500+", "label": "Happy Clients"},
        {"value": "3+", "label": "Years Excellence"},
        {"value": "5", "label": "Star Reviews"},
        {"value": "1", "label": "Certified Master"},
    ]

    class Config:
        extra = "allow"


class PageHeader(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image1Url: Optional[str] = None
    image2Url: Optional[str] = None

    class Config:
        extra = "allow"


class PageHeaders(BaseModel):
    services: PageHeader = PageHeader(
        title="Our Services",
        subtitle="Discover our range of bespoke beauty treatments, meticulously crafted for the minimalist and the detail-obsessed.",
    )
    portfolio: PageHeader = PageHeader(
        title="Our Portfolio",
        subtitle="Explore our curated collection of editorial beauty work, hand-painted finishes, and luxury treatments.",
    )
    testimonials: PageHeader = PageHeader(
        title="Client Stories",
        subtitle="Loved by beauty minimalists and curated for the meticulous. Read what our clients have to say.",
    )
    faq: PageHeader = PageHeader(
        title="Frequently Asked Questions",
        subtitle="Everything you need to know about our services, booking process, policies, and studio care.",
    )

    class Config:
        extra = "allow"


class NewsletterContent(BaseModel):
    title: str = "Stay Polished"
    subtitle: str = "Join our inner circle for priority booking, seasonal trends, and exclusive beauty notes."
    buttonText: str = "Subscribe on Substack"
    finePrint: str = "Respecting your inbox like your time. Unsubscribe anytime."
    substackUrl: str = "https://substack.com/@theprettyplug?r=3ntzvy&utm_medium=ios&utm_source=stories&shareImageVariant=image"

    class Config:
        extra = "allow"


class ContentPayload(BaseModel):
    hero: HeroContent
    trustMetrics: TrustMetricsContent = TrustMetricsContent()
    pageHeaders: PageHeaders = PageHeaders()
    newsletter: NewsletterContent = NewsletterContent()
    clientExperiencesImageUrl: Optional[str] = None

    class Config:
        extra = "allow"

