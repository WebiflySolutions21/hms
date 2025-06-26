# Hospital Configuration API Documentation

This document describes the API endpoints, request/response formats, and validation logic for setting and retrieving
hospital configuration data.

## Overview

The Hospital Configuration API enables frontend applications to dynamically store and retrieve nested configuration
settings for individual hospitals. These settings can control UI elements, theme preferences, feature flags, and more.

The configuration is stored in a structured format using:

* `config_key`: a namespace for the settings (e.g., `branding`, `ui`)
* `path`: a dot-notated string that refers to a nested location in the config tree (e.g., `theme.colors.primary`)
* `value`: the data to store (e.g., color codes, feature flags)

---

## Endpoints

### 1. **Set Configuration**

**URL:** `/config/set`
**Method:** `POST`
**Middleware:** Requires permission: `SET_HOSPITAL_CONFIG`

#### Request Body

```json
{
  "hospital_id": 1,
  "config_key": "branding",
  "path": "theme.colors",
  // optional unless auto_create_paths is true
  "value": {
    "primary": "#00f",
    "secondary": "#0f0"
  },
  "auto_create_paths": true
  // optional, default false
}
```

#### Validation Rules

| Field               | Type    | Required    | Notes                                       |
|---------------------|---------|-------------|---------------------------------------------|
| hospital\_id        | integer | Yes         | Must exist in `hospitals` table             |
| config\_key         | string  | Yes         | Must contain only letters                   |
| path                | string  | Conditional | Required if `auto_create_paths` is not true |
| value               | array   | Yes         | Must be a JSON object                       |
| auto\_create\_paths | boolean | No          | Enables automatic key-path splitting        |

#### Behavior

* **`auto_create_paths = true`**:

    * The system recursively flattens your nested object.
    * Each inner key becomes its own stored path.
    * For example, a value like:

      ```json
      {
        "theme": {
          "colors": {
            "primary": "#00f",
            "accent": "#0f0"
          }
        }
      }
      ```

      becomes:

        * `theme.colors.primary`
        * `theme.colors.accent`

* **`auto_create_paths = false`**:

    * The `path` field is mandatory.
    * The entire `value` object is saved directly under the provided path.
    * This is useful when only one specific part of the config needs to be updated.

#### Success Response

```json
{
  "success": true,
  "message": "Hospital configurations updated successfully"
}
```

#### Error Response (Validation)

```json
{
  "success": false,
  "errorMessage": " The hospital_id field is required."
}
```

#### Error Response (Missing Path)

```json
{
  "success": false,
  "errorMessage": "Path is required when auto_create_paths is false."
}
```

---

### 2. **Get Configuration**

**URL:** `/config/get`
**Method:** `GET`

#### Request Query Parameters

```http
/config/get?hospital_id=1&config_key=branding&path=theme.colors
```

#### Validation Rules

| Field        | Type    | Required | Notes                                            |
|--------------|---------|----------|--------------------------------------------------|
| hospital\_id | integer | Yes      | Must exist in `hospitals` table                  |
| config\_key  | string  | Yes      | Only letters allowed                             |
| path         | string  | No       | If provided, fetches only config under this path |

#### Behavior

* **When `path` is specified**:

    * Returns only the value stored exactly under that path.
    * For example, if path is `theme.colors.primary`, it may return:

      ```json
      {
        "config": "#00f"
      }
      ```

* **When `path` is omitted**:

    * Returns the full nested tree under the given `config_key`.

#### Success Response (Full Tree)

```json
{
  "success": true,
  "config": {
    "theme": {
      "colors": {
        "primary": "#00f",
        "secondary": "#0f0"
      }
    }
  }
}
```

#### Success Response (Path Exact Value)

```json
{
  "success": true,
  "config": "#00f"
}
```

#### Error Response (Validation)

```json
{
  "success": false,
  "errorMessage": "The config_key format is invalid."
}
```

#### Error Response (No Data)

```json
{
  "success": false,
  "errorMessage": "No configuration found for the given parameters"
}
```

---

## Notes for Frontend Developers

* **`config_key`** groups related settings. Think of it like a config namespace.
* **`path`** allows targeting of a specific setting, or whole branches of settings.
* **`auto_create_paths = true`** is ideal when you want to save complex, deeply nested config objects (e.g., entire
  themes, UI states, layout structures). You don’t need to worry about breaking it up into individual key-paths; the
  backend handles it.
* **Without `auto_create_paths`**, use `path` for precise control and updates to small parts of config.
* All data is automatically cast from JSON arrays/objects.
* Returned `config` value is either a tree or single value, depending on your query.

---

## Example Use Cases

### Save UI Theme Config (with nesting)

```json
POST /config/set
{
  "hospital_id": 2,
  "config_key": "branding",
  "auto_create_paths": true,
  "value": {
    "theme": {
      "colors": {
        "primary": "#ff0000",
        "accent": "#333333"
      },
      "font": "Roboto"
    }
  }
}
```

### Save Single Config Path

```json
POST /config/set
{
  "hospital_id": 2,
  "config_key": "branding",
  "path": "theme.colors.primary",
  "value": "#ff0000"
}
```

### Get Full Branding Config

```http
GET /config/get?hospital_id=2&config_key=branding
```

### Get Exact Value of Theme Primary Color

```http
GET /config/get?hospital_id=2&config_key=branding&path=theme.colors.primary
```
