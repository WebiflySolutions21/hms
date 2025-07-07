# Form & Form Version API Documentation

This document describes the API endpoints and data structures for managing forms, form versions, and their hospital-specific assignments. Use this as a reference for frontend integration.

---

## Data Model Overview

- **Form**: Represents a logical form (e.g., "Patient Intake"). Has many versions.
- **FormVersion**: Each version of a form, with its own JSON schema/data.
- **HospitalFormVersionDetail**: Maps a hospital to a specific form version, with status and visibility.

---

## Endpoints

### 1. Create Form
- **URL:** `POST /form/create`
- **Body:**
  - `name` (string, required, unique, min:3)
  - `json` (array, required)
- **Response:** `{ message: string }`
- **Validation:**
  - `name` must be unique in forms table
  - `json` must be a valid array
- **Effect:** Creates a new form and its first version.

---


### 3. Delete Form
- **URL:** `DELETE /form/delete`
- **Body:**
  - `id` (int, required, exists:forms,id)
- **Response:** `{ message: string }`
- **Effect:** Soft deletes the form (sets `is_deleted` to true).

---

### 4. Create Form Version
- **URL:** `POST /form/version/create`
- **Body:**
  - `form_id` (int, required, exists:forms,id)
  - `json` (array, required)
- **Response:** `{ message: string, version: int }`
- **Effect:** Adds a new version to the form.

---

### 5. Update Form Version
- **URL:** `PUT /form/version/update`
- **Body:**
  - `id` (int, required, exists:form_versions,id)
  - `json` (array, required)
- **Response:** `{ message: string }`
- **Effect:** Updates the JSON of a specific form version.

---

### 6. Clone Form Version
- **URL:** `POST /form/version/clone`
- **Body:**
  - `form_version_id` (int, required, exists:form_versions,id)
- **Response:** `{ message: string, version: int }`
- **Effect:** Clones the specified version as a new version for the same form.

---

### 7. Update Hospital Form Version Status
- **URL:** `PUT /form/update/status`
- **Body:**
  - `form_version_id` (int, required, exists:form_versions,id)
  - `hospital_id` (int, required, exists:hospitals,id)
  - `status` (string, required, one of: active, inactive)
  - `visibility` (array, optional, values: doctor, staff, receptionist, lab-technician, pharmacist)
- **Response:** `{ message: string }`
- **Effect:** Sets the status/visibility for a form version for a hospital.

---

### 8. List All Forms and Versions for a Hospital
- **URL:** `GET /form/list?id={hospital_id}`
- **Query Param:**
  - `id` (int, required, exists:hospitals,id)
- **Response:**
```json
{
  "forms": [
    {
      "form_id": 1,
      "form_name": "Patient Intake",
      "versions": [
        {
          "form_version_id": 10,
          "version": 1,
          "json": { ... },
          "status": "active", // or "inactive" (default if not mapped)
          "visibility": ["doctor", "staff"] // or null (default if not mapped)
        },
        // ...more versions
      ]
    },
    // ...more forms
  ]
}
```
- **Effect:** Returns all forms (not deleted) and all their versions, with hospital-specific status/visibility if mapped, else defaults.

---

## Notes
- All endpoints require authentication and appropriate permissions.
- All validation errors are returned in standard Laravel format.
- All JSON fields must be valid arrays/objects.
- Status defaults to "inactive" and visibility to null if not set for a hospital-version mapping.

---

For any questions or clarifications, contact the backend team.

