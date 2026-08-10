from pydantic import BaseModel
from typing import Optional


class TestimonialBase(BaseModel):
    client_name: str
    service_label: Optional[str] = None
    quote: str
    rating: float = 5.0
    avatar_path: Optional[str] = None
    is_featured: bool = False
    is_published: bool = True
    sort_order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(TestimonialBase):
    client_name: Optional[str] = None
    quote: Optional[str] = None


class FAQBase(BaseModel):
    category: str
    question: str
    answer: str
    is_published: bool = True
    sort_order: int = 0


class FAQCreate(FAQBase):
    pass


class FAQUpdate(FAQBase):
    category: Optional[str] = None
    question: Optional[str] = None
    answer: Optional[str] = None


class ServiceBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    price: int = 0
    duration_minutes: Optional[int] = None
    is_active: bool = True
    is_featured: bool = False
    sort_order: int = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    name: Optional[str] = None
    category: Optional[str] = None


class GalleryItemBase(BaseModel):
    title: str
    category: str
    image_path: str
    alt_text: Optional[str] = None
    caption: Optional[str] = None
    is_featured: bool = False
    is_published: bool = True
    sort_order: int = 0


class GalleryItemCreate(GalleryItemBase):
    pass


class GalleryItemUpdate(GalleryItemBase):
    title: Optional[str] = None
    category: Optional[str] = None
    image_path: Optional[str] = None
