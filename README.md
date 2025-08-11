# 🐱 Cat Activity Tracker

A simple, static web application for tracking your cat's daily activities with timestamps and viewing activity summaries in beautiful charts.

## ✨ Features

- **Activity Logging**: Log cat activities with timestamps and optional notes
- **Activity Types**: Predefined categories like eating, sleeping, playing, grooming, etc.
- **Interactive Charts**: Visual representation of activity distribution using Chart.js
- **Date Range Filtering**: View activities and statistics for specific time periods
- **Statistics Dashboard**: See total activities, most active time, and favorite activities
- **Local Storage**: Data persists in your browser (no backend required)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Start tracking** your cat's activities!

No installation or setup required - it's a pure static web app!

## 📱 How to Use

### Adding Activities
1. Select an activity type from the dropdown
2. Choose the date and time when the activity occurred
3. Add optional notes if needed
4. Click "Log Activity"

### Viewing Charts and Stats
1. Use the date range picker to select a time period
2. View the activity distribution chart
3. Check the statistics cards for insights
4. Click "Update Chart" to refresh the data

### Managing Activities
- Recent activities are displayed below the chart
- Delete activities you no longer need
- All data is stored locally in your browser

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Class-based architecture with modern features
- **Chart.js**: Beautiful, responsive charts
- **Local Storage**: Client-side data persistence
- **Google Fonts**: Inter font family for excellent readability

## 🌐 Deployment Options

Since this is a static web app, you can deploy it to any static hosting service:

### 1. **GitHub Pages** (Free)
```bash
# Create a new repository on GitHub
# Push your code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cat-activity-tracker.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Your app will be available at: https://yourusername.github.io/cat-activity-tracker/
```

### 2. **Netlify** (Free tier)
- Drag and drop your project folder to [netlify.com](https://netlify.com)
- Get a custom URL instantly
- Automatic deployments from Git

### 3. **Vercel** (Free tier)
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` in your project directory
- Follow the prompts

### 4. **Firebase Hosting** (Free tier)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

### 5. **Traditional Web Hosting**
- Upload all files to your web server
- Works with any hosting provider (GoDaddy, Bluehost, etc.)

## 📁 Project Structure

```
cat-activity-tracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🔧 Customization

### Adding New Activity Types
Edit the `getActivityTypeDisplay` method in `script.js`:

```javascript
getActivityTypeDisplay(type) {
    const typeMap = {
        'eating': '🍽️ Eating',
        'sleeping': '😴 Sleeping',
        'playing': '🎾 Playing',
        'grooming': '🪮 Grooming',
        'litter-box': '🚽 Litter Box',
        'exploring': '🔍 Exploring',
        'socializing': '👥 Socializing',
        'other': '📝 Other',
        'your-new-type': '🎯 Your New Type'  // Add here
    };
    return typeMap[type] || type;
}
```

### Changing Colors
Modify the color scheme in `styles.css` or update chart colors in `script.js`.

### Data Persistence
The app currently uses localStorage. For cloud storage, you could integrate with:
- Firebase Firestore
- Supabase
- Airtable API
- Your own backend API

## 🌟 Learning Benefits

This project demonstrates:
- **Modern JavaScript**: ES6+ classes, async/await, modern DOM APIs
- **Responsive Design**: Mobile-first CSS with Grid and Flexbox
- **Data Visualization**: Chart.js integration and data processing
- **Local Storage**: Client-side data persistence
- **Event Handling**: Form submissions, user interactions
- **Static Site Deployment**: No backend required

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your deployment experiences

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Next Steps

Once you're comfortable with this static app, consider adding:
- User authentication
- Cloud database integration
- Multiple cat support
- Activity reminders
- Export functionality
- Mobile app version

---

**Happy cat tracking! 🐾**

Built for learning web development and deployment. Perfect for beginners and experienced developers alike.
