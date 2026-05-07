# Google Calendar Event Grid

A lightweight, responsive, zero-dependency vanilla JavaScript and CSS solution for displaying upcoming Google Calendar events in a clean, modern grid format. 

This project allows you to pull events from one or multiple public Google Calendars and automatically assigns specific logos or images to event cards based on keywords found in the event title. Initially developed for a not for profit sporting association's events calendar.

## ✨ Features

* **Vanilla JavaScript & CSS:** No heavy frameworks or libraries required (e.g., React, jQuery).
* **Multi-Calendar Support:** Combine events from multiple Google Calendars into a single chronological feed.
* **Smart Logo Mapping:** Automatically assign specific images/logos to events based on title keywords.
* **Dynamic Countdown:** Calculates and displays a "days to go" badge for upcoming events.
* **Responsive Grid:** CSS Grid implementation that smoothly adapts to mobile, tablet, and desktop screens.
* **Map Links:** Automatically generates a Google Maps link based on the event's location data.

## 🚀 Quick Start

### Step 1: Include the HTML
Add the placeholder container to your webpage where you want the grid to appear.

```html
<div id="custom-event-grid" class="custom-event-grid">
    <div class="loading-events">
        Loading Calendar...
    </div>
</div>
```

### Step 2: Add the CSS
Link or copy the provided `styles.css` into your project. The CSS uses standard variables for colors (e.g., `--color-primary`) with built-in fallbacks, making it easy to integrate into your existing site theme.

### Step 3: Configure the JavaScript
Include the `calendar.js` script in your project. Open the file and update the configuration section at the very top:

```javascript
// --- 1. CONFIGURATION ---
// Replace with your Google Cloud API Key
const API_KEY = 'YOUR_GOOGLE_CALENDAR_API_KEY'; 

// Replace with the absolute path to your default fallback image
const DEFAULT_IMAGE = '/images/placeholder.png'; 

// Add your Google Calendar IDs here
const CALENDARS = [
    'your_calendar_id_1@group.calendar.google.com',
    'your_calendar_id_2@group.calendar.google.com'
];

// --- 2. LOGO MAPPING ---
// Map keywords found in the Event Title to specific image paths
const clubImages = {
    'Keyword 1': '/images/logo-1.jpg',
    'Keyword 2': '/images/logo-2.jpg',
    'Annual Meeting': '/images/meeting-logo.png'
};
```

## 🔑 Prerequisites
To use this code, you will need to get an API key and your Calendar IDs from Google.

### How to get a Google Calendar API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Library** using the left-hand menu.
4. Search for **Google Calendar API** and click **Enable**.
5. Go to **APIs & Services > Credentials**.
6. Click **Create Credentials** at the top and select **API key**.
7. **Important Security Step:** Since this is a frontend script, your API key will be visible in the browser. Click on your new API Key to edit its restrictions. Under "Application restrictions", select **HTTP referrers (web sites)**. Add your website's URL (e.g., `*yourdomain.com/*`) so that unauthorized users cannot use your key on their own websites.

### How to get your Google Calendar ID
1. Open [Google Calendar](https://calendar.google.com/) in your browser.
2. In the left sidebar, hover over the calendar you want to share, click the three vertical dots, and select **Settings and sharing**.
3. Scroll down to **Access permissions for events** and ensure **Make available to public** is checked.
4. Scroll further down to the **Integrate calendar** section.
5. Copy the **Calendar ID** (it usually looks like a long string of characters ending in `@group.calendar.google.com` or just a standard Gmail address).
6. Paste this ID into the `CALENDARS` array in your `calendar.js` file.

## 📄 License
This project is licensed under the MIT License. You are free to use, modify, and distribute this code for personal or commercial projects.