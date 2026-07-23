"""Per-user reef environment customization (colors, rock, fish)."""

from __future__ import annotations

import re
from typing import Any

from app.services import firestore_service

DEFAULT_REEF_SETTINGS: dict[str, Any] = {
    "show_rock": False,
    "show_fish": False,
    "water_color": "#041a2c",
    "sand_color": "#0f2d42",
    "fish_color": "#8ec8e0",
    "rock_color": "#4a4540",
}

_HEX_COLOR = re.compile(r"^#[0-9a-fA-F]{6}$")
_REEF_SETTING_KEYS = (
    "show_rock",
    "show_fish",
    "water_color",
    "sand_color",
    "fish_color",
    "rock_color",
    "updated_at",
)


def _sanitize_reef_settings(settings: dict[str, Any]) -> dict[str, Any]:
    return {key: settings[key] for key in _REEF_SETTING_KEYS if key in settings}


def _normalize_hex_color(value: Any, fallback: str) -> str:
    if value is None:
        return fallback
    text = str(value).strip()
    if not text:
        return fallback
    if not text.startswith("#"):
        text = f"#{text}"
    if not _HEX_COLOR.match(text):
        raise ValueError(f"Invalid color: {value}")
    return text.lower()


def get_reef_settings(user_id: str) -> dict[str, Any]:
    return _sanitize_reef_settings(firestore_service.get_reef_settings(user_id))


def save_reef_settings(user_id: str, settings: dict[str, Any]) -> dict[str, Any]:
    merged = {**DEFAULT_REEF_SETTINGS, **settings}
    merged["show_rock"] = bool(merged.get("show_rock"))
    merged["show_fish"] = bool(merged.get("show_fish"))
    merged["water_color"] = _normalize_hex_color(
        merged.get("water_color"), DEFAULT_REEF_SETTINGS["water_color"]
    )
    merged["sand_color"] = _normalize_hex_color(
        merged.get("sand_color"), DEFAULT_REEF_SETTINGS["sand_color"]
    )
    merged["fish_color"] = _normalize_hex_color(
        merged.get("fish_color"), DEFAULT_REEF_SETTINGS["fish_color"]
    )
    merged["rock_color"] = _normalize_hex_color(
        merged.get("rock_color"), DEFAULT_REEF_SETTINGS["rock_color"]
    )
    return firestore_service.save_reef_settings(user_id, _sanitize_reef_settings(merged))
