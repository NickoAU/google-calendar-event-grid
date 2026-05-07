document.addEventListener("DOMContentLoaded", function() {

    // --- 1. CONFIGURATION ---
    // REPLACE WITH YOUR OWN GOOGLE CALENDAR API KEY
    const API_KEY = 'YOUR_API_KEY_HERE'; 
    
    // REPLACE WITH THE PATH TO YOUR DEFAULT IMAGE
    const DEFAULT_IMAGE = '/images/placeholder.png'; 

    // ADD YOUR GOOGLE CALENDAR IDs HERE
    // You can find these in your Google Calendar settings under "Integrate calendar"
    const CALENDARS = [
        'your_calendar_id_1@group.calendar.google.com',
        'your_calendar_id_2@group.calendar.google.com'
    ];

    // --- 2. LOGO MAPPING ---
    // Map keywords found in the Event Title (summary) to specific image paths
    const clubImages = {
        'Event Keyword 1': '/images/logo-1.jpg',
        'Event Keyword 2': '/images/logo-2.jpg',
        'Annual Meeting': '/images/meeting-logo.png'
    };

    const grid = document.getElementById('custom-event-grid');
    const now = new Date().toISOString();

    const fetchPromises = CALENDARS.map(calID => {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?key=${API_KEY}&timeMin=${now}&singleEvents=true&orderBy=startTime`;
        return fetch(url).then(response => response.json());
    });

    Promise.all(fetchPromises)
        .then(results => {
            let allEvents = [];
            results.forEach(data => { if (data.items) allEvents = allEvents.concat(data.items); });
            allEvents.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));
            const upcomingEvents = allEvents.slice(0, 12); 
            grid.innerHTML = ''; 

            if (upcomingEvents.length > 0) {
                upcomingEvents.forEach(event => createEventCard(event));
            } else {
                grid.innerHTML = '<p style="text-align:center;">No upcoming events found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching calendars:', error);
            grid.innerHTML = '<p style="text-align:center;">Unable to load events.</p>';
        });

    function createEventCard(event) {
        // 1. DATE
        const start = new Date(event.start.dateTime || event.start.date);
        const dateString = start.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
        const today = new Date();
        const timeDiff = start.getTime() - today.getTime();
        const daysToGo = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let badgeText = daysToGo <= 0 ? "Today" : (daysToGo === 1 ? "Tomorrow" : daysToGo + " days to go");

        // 2. LOCATION
        let locationRaw = event.location || 'Location TBA';
        let locationClean = locationRaw.split(',')[0]; 
        
        let mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(locationRaw);
        
        let locationHTML = event.location 
            ? `<a href='${mapUrl}' target='_blank' class='event-location-link'><i class='fa-solid fa-map-location-dot' style='color:var(--color-secondary, #e6b800)'></i> ${locationClean}</a>` 
            : locationClean;

        // 3. DESCRIPTION
        let desc = event.description || '';
        desc = desc.replace(/<br\s*\/?>/gi, '\n');
        desc = desc.replace(/<\/p>/gi, '\n');
        desc = desc.replace(/<\/div>/gi, '\n');
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = desc;
        desc = tempDiv.textContent || tempDiv.innerText || "";
        desc = desc.trim().replace(/\n/g, '<br>');

        // 4. IMAGE
        let imageSrc = DEFAULT_IMAGE;
        const summaryLower = event.summary.toLowerCase();
        for (const [key, value] of Object.entries(clubImages)) {
            if (summaryLower.includes(key.toLowerCase())) {
                imageSrc = value;
                break;
            }
        }

        // 5. RENDER
        const cardHTML = `
            <div class='event-card'>
                <div class='event-card-image'>
                    <img src='${imageSrc}' alt='${event.summary}'>
                </div>
                <div class='event-countdown'><i class='fa-regular fa-clock'></i> ${badgeText}</div>
                <div class='event-card-body'>
                    <h3>${event.summary}</h3>
                    <div class='event-meta'>
                        <strong>${dateString}</strong>
                        <br>
                        ${locationHTML}
                    </div>
                    <div class='event-desc'>${desc}</div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    }
});