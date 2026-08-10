from datetime import datetime, timedelta, timezone
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def validate_bcrypt_password(password: str) -> None:
    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password must be 72 bytes or fewer for bcrypt.")


def hash_password(password: str) -> str:
    validate_bcrypt_password(password)
    return password_context.hash(password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    validate_bcrypt_password(plain_password)
    return password_context.verify(plain_password, password_hash)


def create_access_token(subject: str, extra_claims: dict[str, Any] | None = None) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes,
    )
    payload: dict[str, Any] = {
        "sub": subject,
        "exp": expires_at,
    }
    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(
        payload,
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(
            token,
            settings.jwt_secret_key,
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError:
        return None
