// Cat Activity Tracker JavaScript

class CatActivityTracker {
    constructor() {
        this.activities = this.loadActivities();
        this.chart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDates();
        this.renderActivities();
        this.updateChart();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('addActivityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addActivity();
        });

        // Chart update button
        document.getElementById('updateChart').addEventListener('click', () => {
            this.updateChart();
            this.updateStats();
        });

        // Date change listeners
        document.getElementById('startDate').addEventListener('change', () => {
            this.updateChart();
            this.updateStats();
        });

        document.getElementById('endDate').addEventListener('change', () => {
            this.updateChart();
            this.updateStats();
        });
    }

    setDefaultDates() {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        document.getElementById('startDate').value = this.formatDateForInput(lastWeek);
        document.getElementById('endDate').value = this.formatDateForInput(today);
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    addActivity() {
        const form = document.getElementById('addActivityForm');
        const formData = new FormData(form);
        
        const activity = {
            id: Date.now(),
            type: formData.get('activityType'),
            time: formData.get('activityTime'),
            notes: formData.get('activityNotes'),
            timestamp: new Date().toISOString()
        };

        this.activities.unshift(activity);
        this.saveActivities();
        this.renderActivities();
        this.updateChart();
        this.updateStats();
        
        // Reset form
        form.reset();
        
        // Show success feedback
        this.showNotification('Activity logged successfully!', 'success');
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
        this.saveActivities();
        this.renderActivities();
        this.updateChart();
        this.updateStats();
        this.showNotification('Activity deleted!', 'info');
    }

    renderActivities() {
        const activitiesList = document.getElementById('activitiesList');
        const noActivitiesMessage = document.getElementById('noActivitiesMessage');
        
        if (this.activities.length === 0) {
            activitiesList.style.display = 'none';
            noActivitiesMessage.style.display = 'block';
            return;
        }

        activitiesList.style.display = 'block';
        noActivitiesMessage.style.display = 'none';

        activitiesList.innerHTML = this.activities
            .slice(0, 10) // Show only recent 10 activities
            .map(activity => this.createActivityHTML(activity))
            .join('');
    }

    createActivityHTML(activity) {
        const date = new Date(activity.time);
        const formattedTime = date.toLocaleString();
        const activityTypeDisplay = this.getActivityTypeDisplay(activity.type);
        
        return `
            <div class="activity-item">
                <div class="activity-info">
                    <div class="activity-type">${activityTypeDisplay}</div>
                    <div class="activity-time">${formattedTime}</div>
                    ${activity.notes ? `<div class="activity-notes">${activity.notes}</div>` : ''}
                </div>
                <div class="activity-actions">
                    <button class="btn btn-small btn-danger" onclick="tracker.deleteActivity(${activity.id})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }

    getActivityTypeDisplay(type) {
        const typeMap = {
            'eating': '🍽️ Eating',
            'sleeping': '😴 Sleeping',
            'playing': '🎾 Playing',
            'grooming': '🪮 Grooming',
            'litter-box': '🚽 Litter Box',
            'exploring': '🔍 Exploring',
            'socializing': '👥 Socializing',
            'other': '📝 Other'
        };
        return typeMap[type] || type;
    }

    updateChart() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (!startDate || !endDate) return;

        const filteredActivities = this.getFilteredActivities(startDate, endDate);
        const chartData = this.prepareChartData(filteredActivities);
        
        this.renderChart(chartData);
    }

    getFilteredActivities(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59); // Include the entire end date
        
        return this.activities.filter(activity => {
            const activityDate = new Date(activity.time);
            return activityDate >= start && activityDate <= end;
        });
    }

    prepareChartData(activities) {
        const activityCounts = {};
        const hourlyData = Array(24).fill(0);
        
        activities.forEach(activity => {
            // Count by activity type
            activityCounts[activity.type] = (activityCounts[activity.type] || 0) + 1;
            
            // Count by hour
            const hour = new Date(activity.time).getHours();
            hourlyData[hour]++;
        });

        return {
            activityCounts,
            hourlyData
        };
    }

    renderChart(data) {
        const ctx = document.getElementById('activityChart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }

        // Create combined chart with activity types and hourly distribution
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(data.activityCounts).map(type => this.getActivityTypeDisplay(type)),
                datasets: [{
                    label: 'Activity Count',
                    data: Object.values(data.activityCounts),
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#f093fb',
                        '#f5576c',
                        '#4facfe',
                        '#00f2fe',
                        '#43e97b',
                        '#38f9d7'
                    ],
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Activity Distribution by Type',
                        font: {
                            size: 16,
                            weight: '600'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    updateStats() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (!startDate || !endDate) return;

        const filteredActivities = this.getFilteredActivities(startDate, endDate);
        
        // Total activities
        document.getElementById('totalActivities').textContent = filteredActivities.length;
        
        // Most active time
        const hourlyData = Array(24).fill(0);
        filteredActivities.forEach(activity => {
            const hour = new Date(activity.time).getHours();
            hourlyData[hour]++;
        });
        
        const mostActiveHour = hourlyData.indexOf(Math.max(...hourlyData));
        const mostActiveTime = mostActiveHour === 0 ? '12 AM' : 
                              mostActiveHour < 12 ? `${mostActiveHour} AM` : 
                              mostActiveHour === 12 ? '12 PM' : 
                              `${mostActiveHour - 12} PM`;
        
        document.getElementById('mostActiveTime').textContent = mostActiveTime;
        
        // Favorite activity
        const activityCounts = {};
        filteredActivities.forEach(activity => {
            activityCounts[activity.type] = (activityCounts[activity.type] || 0) + 1;
        });
        
        if (Object.keys(activityCounts).length > 0) {
            const favoriteActivity = Object.keys(activityCounts).reduce((a, b) => 
                activityCounts[a] > activityCounts[b] ? a : b
            );
            document.getElementById('favoriteActivity').textContent = 
                this.getActivityTypeDisplay(favoriteActivity);
        } else {
            document.getElementById('favoriteActivity').textContent = '-';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    loadActivities() {
        const saved = localStorage.getItem('catActivities');
        return saved ? JSON.parse(saved) : [];
    }

    saveActivities() {
        localStorage.setItem('catActivities', JSON.stringify(this.activities));
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the tracker when the page loads
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new CatActivityTracker();
});
