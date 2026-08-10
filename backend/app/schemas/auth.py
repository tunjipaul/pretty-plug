from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AdminUser(BaseModel):
    id: str
    email: EmailStr
    full_name: str | None = None
    role: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AdminUser

