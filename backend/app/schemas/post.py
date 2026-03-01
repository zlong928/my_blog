from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    published: bool = True


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None


class Post(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True