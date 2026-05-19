# PaiSim Lab

An AI-Powered Customer Simulation Experiment Dashboard

---

# What is PaiSim Lab?

PaiSim Lab is a web application that helps businesses and AI teams test different customer data combinations to figure out which setup gives the best predictions.

In very simple words:

Imagine a company wants to predict:

* Which product customers will buy
* What customers think about a product
* How likely customers are to leave a bad review
* What customers might do in the future

To make these predictions, companies use different kinds of data such as:

* Sales numbers
* Customer reviews
* Surveys
* Interview transcripts

But there is a problem:

The company does not know which combination of data works best.

That is where PaiSim Lab helps.

The app allows teams to:

* Upload experiment results
* Compare simulation accuracy
* Visualize performance with charts
* Generate AI-powered recommendation reports

---

# Why I Built This Project

I built this project to simulate the kind of work done at modern AI startups and data science companies.

The internship role talked about:

* Running experiments
* Comparing simulation configurations
* Benchmarking prediction accuracy
* Working with multiple data sources
* Writing recommendation memos

So I wanted to create a realistic but simple platform that demonstrates those ideas.

---

# Main Features

## 1. Upload CSV Experiment Files

Users can upload CSV files containing simulation experiment results.

Example data inside a CSV file:

| Configuration         | Accuracy |
| --------------------- | -------- |
| Sales + Reviews       | 81%      |
| Survey Heavy          | 74%      |
| Balanced Multi-Source | 88%      |

The app reads this file automatically and displays the data in the dashboard.

---

## 2. Experiment Dashboard

The dashboard shows:

* Accuracy scores
* Error rates
* Confidence levels
* Notes about experiments

This helps users compare which setup performs best.

---

## 3. Interactive Graphs

The app uses pastel purple charts to visually compare experiment accuracy.

This makes it easier for users and teams to understand the data quickly.

---

## 4. AI Recommendation Memo

One of the main features of the app is the AI-powered recommendation system.

The app sends experiment data to the Gemini API.

Gemini then:

* Reads the experiment results
* Finds the best-performing setup
* Explains why it worked well
* Suggests future experiments
* Creates a professional recommendation memo

This simulates how AI tools can help businesses make decisions faster.

---

# Example Real-World Scenario

Imagine a shoe company wants to predict customer behavior before launching a new sneaker.

The company tests:

* Sales data
* Social media reviews
* Customer surveys
* Product interviews

PaiSim Lab helps the company understand:

"Which combination of customer data gives the most accurate predictions?"

---

# Technologies Used

## Frontend

* React
* Vite
* CSS
* Recharts
* Lucide React Icons

The frontend is responsible for:

* Displaying the dashboard
* Uploading CSV files
* Showing charts
* Displaying AI-generated memos

---

## Backend

* Node.js
* Express.js

The backend handles:

* API requests
* Communication with Gemini AI
* Processing experiment data securely

---

## AI Integration

* Google Gemini API

Gemini is used to:

* Analyze experiment results
* Generate recommendation reports
* Simulate AI-assisted business decision making

---

# How the App Works

## Step 1

The user uploads a CSV file.

## Step 2

The app reads the data using PapaParse.

## Step 3

The dashboard displays:

* Charts
* Metrics
* Experiment records

## Step 4

The user clicks "Generate AI Memo."

## Step 5

The backend sends the experiment data to Gemini AI.

## Step 6

Gemini analyzes the results and returns a recommendation report.

## Step 7

The recommendation memo is displayed inside the app.

---

# Folder Structure

```txt
paisim-lab/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

# How to Run the Project

## 1. Install dependencies

```bash
npm install
```

## 2. Add your Gemini API key

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## 3. Start the application

```bash
npm run dev
```

---

# Future Improvements

Possible future upgrades:

* User authentication
* Database integration
* Live simulation testing
* More advanced machine learning models
* Team collaboration tools
* Exportable PDF reports
* Dark mode
* More advanced analytics dashboards

---

# What I Learned

Through this project I learned:

* Full-stack web development
* React dashboard design
* Backend API integration
* AI API integration
* CSV data handling
* Data visualization
* Building professional UI/UX
* How AI can assist with business decision making

---

# Final Thoughts

PaiSim Lab is a lightweight but realistic AI experiment dashboard designed to simulate how startups and data science teams evaluate customer simulation models.

The goal of the project was to create a professional-looking application that combines:

* Data science concepts
* AI-assisted recommendations
* Visualization dashboards
* Clean UI/UX design

while still keeping the system simple, understandable, and easy to use.
