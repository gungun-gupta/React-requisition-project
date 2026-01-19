📦 Inventory & Requisition Management System (IRMS)

IRMS is a web-based ERP module designed to streamline inventory tracking and material requisition workflows within an organization.
It enables departments to raise requisitions, monitor approval status, and analyze stock usage through an interactive dashboard.

⚠️ Scope:
The current system focuses on inventory and requisition management.
The architecture is extensible to include other ERP modules such as Procurement, Supplier Management, and Finance in the future.

🗂️ Project Structure

src/

components/

Dashboard summary cards

Filters and tables

Requisition forms

pages/

Dashboard

Requisition Management

services/

API service handlers

utils/

Date filtering & helper functions

public/

Static assets

package.json

Project dependencies and scripts

🚀 Features

📊 Dashboard Summary

Total requisitions

Total quantities requested

Total stock value

Approval status breakdown

Top requested materials

📅 Advanced Date Filtering

Filter requisitions using fromDate and toDate

Dynamic data refresh

📁 CRUD Operations

Create, Read, Update, Delete requisitions

Form-based material requests

✅ Approval Status Tracking

Approved

Pending

Rejected

🏢 Department-wise Analysis

Monitor requisitions per department

Improve material planning and accountability

🔍 Top Material Identification

Detect most frequently requested items

🧱 Tech Stack
🌐 Frontend

React.js (Vite)

Tailwind CSS

JavaScript (ES6)

React Icons

💾 Backend

RESTful APIs

JSON-based data exchange

🧪 Development Tools

Postman – API testing

VS Code – Development environment

Git & GitHub – Version control

▶️ How to Run (Local Development)
1️⃣ Clone the Repository
git clone https://github.com/gungun-gupta/React-requisition-project
cd irms-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Start the Application
npm run dev


The application will be available at:

http://localhost:5173

🖥️ Screenshots

(To be added later)

Dashboard Overview

Requisition Filter & Table

Summary Cards

🔄 How It Works

Users create material requisitions through a structured form.

Requisitions are stored and retrieved via REST APIs.

Dashboard aggregates data to show:

Requisition counts

Stock value

Department-wise usage

Filters dynamically update displayed records based on date range and status.

🔮 Future Enhancements

🔐 Role-Based Authentication (Admin / User)

📦 Material & Category Master

📈 Graphs & Analytics

Recharts / Chart.js integration

📤 Export Reports

Excel & PDF downloads

🔄 Integration with Procurement & Supplier Modules

📌 Use Case

This system is suitable for:

Educational ERP projects

Small to mid-size organizations

Inventory planning & material tracking

ERP module demonstrations and viva exams
