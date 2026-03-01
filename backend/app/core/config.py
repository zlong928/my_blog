from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Blog API"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./blog.db"
    
    class Config:
        env_file = ".env"


settings = Settings()