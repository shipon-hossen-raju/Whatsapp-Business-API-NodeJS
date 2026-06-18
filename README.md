# 💬 WhatsApp Business Cloud API Node.js Integration

A lightweight Node.js & Express application to seamlessly integrate with **Meta's WhatsApp Business Cloud API** for sending template messages, notifications, and alerts.

---

## 📌 Features

- 🚀 **Meta Cloud API (v22.0)**: Direct integration with official Meta Graph API.
- 📩 **Template Message Delivery**: Send pre-approved templates (e.g., `hello_world` or custom ones).
- 🔑 **Environment Driven**: Secure configuration using dotenv without hardcoding credentials.
- ⚡ **Express & Nodemon**: Fast setup with live reloading for development.

---

## 📋 Prerequisites

Before running this project, ensure you have:

1. **[Node.js](https://nodejs.org/)** (v16.x or later installed)
2. **[npm](https://www.npmjs.com/)** (Node Package Manager)
3. **[Meta Developer Account](https://developers.facebook.com/)**

---

## ⚙️ Meta Developer Setup Guide (Step-by-Step)

Follow these steps to obtain your API credentials from Meta:

### Step 1: Create a Meta App
1. Go to the [Meta for Developers Portal](https://developers.facebook.com/).
2. Log in and click **My Apps** > **Create App**.
3. Select **Other** (or Business) as the app type and click **Next**.
4. Choose **Business** as the app type, fill in your app details, and click **Create App**.

### Step 2: Add WhatsApp Product
1. On the App Dashboard, scroll down to **WhatsApp** and click **Set up**.
2. Select or create a **Meta Business Account**.
3. You will be redirected to the **API Setup** page.

### Step 3: Get API Credentials
From the **API Setup** page:
- **Temporary Access Token**: Copy the generated token (Note: Valid for 24 hours).
- **Phone Number ID**: Copy the ID under **Step 1: Select phone numbers**.
- **Test Phone Number**: Add your personal WhatsApp number in **To** field to authorize message delivery during testing.

> 💡 *For production use, generate a permanent access token via System Users in Business Settings.*

---

## 🛠️ Project Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/shipon-hossen-raju/Whatsapp-Business-API-NodeJS.git
cd Whatsapp-Business-API-NodeJS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Open `.env` and fill in your Meta credentials:

```env
PORT=3000

# Meta WhatsApp Credentials
WHATSAPP_TOKEN=your_meta_access_token_here
PHONE_NUMBER_ID=893818507150447
API_VERSION=v22.0

# Recipient Phone Number (Must include country code, e.g. +8801310861071)
TO=+8801310861071

# Template Settings
TEMPLATE_NAME=hello_world
TEMPLATE_LANG=en_US
```

---

## 🏃 Running the Application

### Start Development Server
Runs the server with `nodemon` for auto-reloading:

```bash
npm start
```

You should see output similar to:
```text
WhatsApp API Server running on http://localhost:3000
```

---

## 🔌 API Endpoints & Usage

### 1. Health Check
Checks if the API server is active.

- **Endpoint**: `GET /`
- **Response**:
```json
{
  "status": true,
  "message": "WhatsApp Business API Node.js Server is running."
}
```

---

### 2. Send WhatsApp Message
Triggers a template message to the target recipient specified in `.env`.

- **Endpoint**: `GET /sendMessage`
- **cURL Request**:
```bash
curl http://localhost:3000/sendMessage
```
- **Success Response**:
```json
{
  "status": true,
  "respondData": {
    "messaging_product": "whatsapp",
    "contacts": [
      {
        "input": "+8801310861071",
        "wa_id": "8801310861071"
      }
    ],
    "messages": [
      {
        "id": "wamid.HBgNNDgwMTMxMDg2MTA3MRUCABEYEjE2ME..."
      }
    ]
  }
}
```

---

## 📂 Project Structure

```text
Whatsapp-Business-API-NodeJS/
├── .env.example      # Environment variables template
├── .env              # Local configuration (Git ignored)
├── package.json      # Project dependencies & scripts
├── whatsApp.js       # Main Express application & WhatsApp logic
└── README.md         # Documentation
```

---

## ⚠️ Common Errors & Troubleshooting

| Error Code | Cause | Solution |
| :--- | :--- | :--- |
| `190` | Access Token Expired | Generate a new temporary token from Meta Portal or set up a System User Permanent Token. |
| `131030` | Recipient Not Verified | Add the recipient's phone number under **To** dropdown in Meta API Setup page. |
| `100` | Invalid Parameter / Phone Number | Ensure recipient number includes country code without spaces or dashes (e.g. `+8801310861071`). |
| `132001` | Template Not Found | Verify `TEMPLATE_NAME` matches an approved template in Meta WhatsApp Template Manager. |

---

## 📄 License

This project is open-source under the [ISC License](LICENSE).
