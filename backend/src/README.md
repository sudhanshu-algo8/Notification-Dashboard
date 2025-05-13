# 📣 Notification Dashboard API Documentation

This document describes the REST API endpoints for the Real-Time Notification Dashboard backend.

---

## 🔔 POST /notify

Send a notification to all connected WebSocket clients and store it in the database.

### ✅ Request

**Method:** POST  
**URL:** /notify  
**Content-Type:** application/json

### 📝 Request Body

| Field   | Type   | Required | Description                          |
|---------|--------|----------|--------------------------------------|
| title   | string | Yes      | Title of the notification            |
| message | string | Yes      | Message body of the notification     |
| type    | string | Yes      | Type of the notification (info, warning, error) |

#### Example:
```json
{
  "title": "System Update",
  "message": "The system will undergo maintenance at midnight.",
  "type": "info"
}
```

#### Response
```json

    {
  "success": true,
  "notification": {
    "_id": "663dfdbf3b78bba4512678ea",
    "title": "System Update",
    "message": "The system will undergo maintenance at midnight.",
    "type": "info",
    "createdAt": "2025-05-13T12:30:44.812Z",
    "__v": 0
  }
}
```

#### Error 400 Bad Request
```json
{
  "success": false,
  "error": "All fields (title, message, type) are required."
}
```

#### Error 500 Internal Server Error
```json

{
  "success": false,
  "error": "Failed to send notification."
}
```


## 🔔 GET  /history

Fetches a list of all notifications.

#### Example:
```json
[
    {
        "_id": "68230bfcf1cf5219879fd93a",
        "title": "Server Update",
        "message": "A new update has been deployed.",
        "type": "info",
        "timestamp": "2025-05-13T09:08:12.408Z",
        "__v": 0
    },
    {
        "_id": "68230c77f1cf5219879fd93c",
        "title": "Server Update warning",
        "message": "A new warning has been deployed.",
        "type": "warning",
        "timestamp": "2025-05-13T09:10:15.375Z",
        "__v": 0
    },
    {
        "_id": "68230cbbf1cf5219879fd93e",
        "title": "Server Update error",
        "message": "A new error has been deployed.",
        "type": "error",
        "timestamp": "2025-05-13T09:11:23.600Z",
        "__v": 0
    },
    {
        "_id": "6823287b655471344033bb79",
        "title": "Server Update",
        "message": "A new update has been deployed.",
        "type": "info",
        "timestamp": "2025-05-13T11:09:47.096Z",
        "__v": 0
    },
    {
        "_id": "68232d3d9d76fd39cdad906a",
        "title": "service",
        "message": "hello",
        "type": "info",
        "timestamp": "2025-05-13T11:30:05.279Z",
        "__v": 0
    },
    {
        "_id": "68232d539d76fd39cdad906c",
        "title": "service",
        "message": "hello",
        "type": "info",
        "timestamp": "2025-05-13T11:30:27.459Z",
        "__v": 0
    },
    {
        "_id": "68232d609d76fd39cdad906e",
        "title": "service",
        "message": "hello",
        "type": "warning",
        "timestamp": "2025-05-13T11:30:40.900Z",
        "__v": 0
    },
    {
        "_id": "68232d8d9d76fd39cdad9070",
        "title": "service",
        "message": "hello",
        "type": "warning",
        "timestamp": "2025-05-13T11:31:25.903Z",
        "__v": 0
    }
]
```