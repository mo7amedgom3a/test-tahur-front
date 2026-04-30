# Tahur Backend API Documentation

This document provides an overview of all API endpoints for the Tahur application, including both public and authenticated routes.

## Table of Contents

- [Authentication](#authentication)
- [User Account](#user-account)
- [Appointments](#appointments)
- [Doctors & Availability](#doctors--availability)
- [Payments & Transactions](#payments--transactions)
- [Wallet & Withdrawals](#wallet--withdrawals)
- [Ratings & Reviews](#ratings--reviews)
- [Notifications](#notifications)
- [Settings & References](#settings--references)
- [Support](#support)
- [Admin Panel](#admin-panel)
- [Public Endpoints](#public-endpoints)
- [Video Call (Agora)](#video-call-agora)

---

## Authentication

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/register` | Register a new user (patient or doctor) |
| POST | `/api/v1/user/login` | Login with phone number |
| POST | `/api/v1/user/verifyOtp` | Verify OTP sent to phone |
| POST | `/api/v1/user/resendOtp` | Resend OTP |
| POST | `/api/v1/user/socialLogin/{provider}` | Social login (Google, etc.) |
| POST | `/api/v1/user/logout` | Logout user |
| POST | `/api/v1/admin/login` | Admin login |
| POST | `/api/v1/user/forgotPassword` | Request password reset |
| POST | `/api/v1/user/verifyForgotPasswordOtp` | Verify forgot password OTP |
| POST | `/api/v1/user/resendForgotPasswordOtp` | Resend forgot password OTP |
| POST | `/api/v1/user/resetPassword` | Reset password |

---

## User Account

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/profile` | Get user profile |
| POST | `/api/v1/user/updateProfile` | Update user profile |
| POST | `/api/v1/user/changePassword` | Change password |
| POST | `/api/v1/user/notification` | Toggle notification status |
| POST | `/api/v1/user/updateFcmToken` | Update FCM token |
| POST | `/api/v1/user/AccountUpdatePatientProfile` | Update patient profile |
| POST | `/api/v1/user/AccountUpdatePhysicianProfile` | Update doctor profile |
| POST | `/api/v1/user/SkipOption` | Skip registration step |

### Health Records

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/storeHealthRecords` | Store health records |
| GET | `/api/v1/user/UserGetHealthRecords` | Get user health records |
| POST | `/api/v1/user/StoreUserStressLevel` | Store stress level |
| POST | `/api/v1/user/UpdateExisthealthrecords` | Update existing health record |

---

## Appointments

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/BookAppointment` | Book an appointment |
| GET | `/api/v1/user/getAppointmentRequestList` | Get appointment request list (doctor) |
| GET | `/api/v1/user/PatientAppointmentRequestList` | Get patient appointments |
| GET | `/api/v1/user/AppointmentRequestDetails` | Get appointment details |
| POST | `/api/v1/user/acceptRejectRequest` | Accept/reject appointment request |
| POST | `/api/v1/user/RejectRequestByPhysician` | Physician rejects request |
| POST | `/api/v1/user/RejecAppointmentByPatient` | Patient rejects appointment |
| POST | `/api/v1/user/CompleteAppointmentStatus` | Mark appointment as completed |
| GET | `/api/v1/user/PhysicianHome` | Get physician appointments |
| GET | `/api/v1/user/get-all-appointments` | Get all appointments |
| GET | `/api/v1/user/PastAppointmentList` | Get past appointments |
| GET | `/api/v1/user/CancelledAppointmentDetails` | Get cancelled appointment details |
| GET | `/api/v1/user/appointment-info/{patient_id}/{doctor_id}` | Get appointment info |
| GET | `/api/v1/user/getAppointmentChatStatus` | Check if chat is allowed |
| GET | `/api/v1/user/{doctor_id}/earnings` | Get doctor earnings |

---

## Doctors & Availability

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/home` | Get doctor list for home |
| GET | `/api/v1/user/GetPhyscianbyId` | Get doctor by ID |
| GET | `/api/v1/user/search-physicians` | Search doctors |
| POST | `/api/v1/user/WeekSchedulesbyPhysician` | Set physician weekly schedule |
| GET | `/api/v1/user/WeekSchedulesbyPhysicianId` | Get weekly schedule |
| GET | `/api/v1/user/GetPhysicianAppointmentDetail` | Get available slots for date |
| POST | `/api/v1/api/v1/doctor/availability` | Set doctor availability |
| GET | `/api/v1/api/v1/doctor/availability/{doctor_id}` | Get doctor availability |

---

## Payments & Transactions

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/moyasar-test` | Test Moyasar payment |
| POST | `/api/moyasar-apple-pay` | Apple Pay payment |
| ANY | `/api/moyasar-callback` | Moyasar payment callback |
| ANY | `/api/paymentNowMoyasar` | Process payment after callback |

---

## Wallet & Withdrawals

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/wallet/{user_id}` | Get wallet balance |
| POST | `/api/v1/user/withdrawal-request` | Request withdrawal |

---

## Ratings & Reviews

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/addRating` | Add rating/review |
| GET | `/api/v1/user/getRatings` | Get ratings list |

---

## Notifications

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/notificationList` | Get notification list |
| GET | `/api/v1/user/notification-status/{id}` | Get notification status |

---

## Settings & References

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/PhysicianRoles` | Get physician roles |
| GET | `/api/v1/user/Sepecialisations` | Get specializations |
| GET | `/api/v1/user/languages` | Get languages |
| GET | `/api/v1/user/CurrentStressLevels` | Get stress levels |
| GET | `/api/v1/user/HealthRecords` | Get health record types |
| GET | `/api/v1/user/GetWeekDays` | Get week days |
| GET | `/api/v1/user/GetWorldCountries` | Get countries |
| GET | `/api/v1/user/GetReasons` | Get cancel reasons |
| GET | `/api/v1/user/ReportGetReasons` | Get report reasons |

---

## Support

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/support` | Submit support request |
| POST | `/api/v1/user/UserSubmitReport` | Report a user |

---

## Bank Accounts

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/v1/user/addBankAccount` | Add bank account |
| GET | `/api/v1/user/bankAccount/{userId}` | Get bank account |
| GET | `/api/v1/banks` | Get all banks |

---

## Video Call (Agora)

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/user/GetToken` | Get Agora token |
| POST | `/api/v1/user/CallCancelledStatus` | Cancel call status |
| GET | `/api/v1/user/CallExtendStatus` | Extend call (book next slot) |

---

## Public Endpoints

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/v1/public/content/home` | Get home banner |
| GET | `/api/v1/public/content/page/{slug}` | Get page content |
| POST | `/api/v1/public/account-deletion/send-otp` | Send OTP for account deletion |
| POST | `/api/v1/public/account-deletion/verify-otp` | Verify OTP and delete account |

---

## Admin Panel (Web Routes)

### Request Management

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/requestManagement` | List pending requests |
| GET | `/admin/requestManagement/{id}` | View request details |
| GET | `/admin/doctor/approve/{id}` | Approve doctor request |
| GET | `/admin/doctor/reject/{id}` | Reject doctor request |
| GET | `/admin/doctorRequests` | Get all doctor requests |
| POST | `/admin/approve-account` | Approve appointment |
| POST | `/admin/reject-account` | Reject appointment |

### User Management

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/userManagement` | List all users |
| GET | `/admin/all-users` | Get all users list |
| GET | `/admin/userManagement/{id}` | View user details |
| POST | `/admin/activeOrInactiveUser` | Activate/deactivate user |
| POST | `/admin/deleteUser` | Delete user |
| POST | `/admin/DeleteReport` | Delete report |

### Appointments (Admin)

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/appointment` | List appointments |
| GET | `/admin/appointments` | Get all appointments |
| GET | `/admin/appointment/{id}` | View appointment |
| POST | `/admin/deleteAppointmentUser` | Delete appointment |

### Reports

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/reports` | List reports |
| POST | `/admin/blockUser` | Block user |

### Withdrawal Requests

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/withdrawal-requests` | List withdrawal requests |
| POST | `/admin/withdrawal/approve/{id}` | Approve withdrawal |
| POST | `/admin/withdrawal/reject/{id}` | Reject withdrawal |

### Pages & Settings

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/page` | List pages |
| POST | `/admin/page` | Save page content |
| GET | `/admin/setting` | List settings |
| POST | `/admin/setting` | Save settings |
| POST | `/admin/updateMoyasar` | Update Moyasar API key |

### Admin Profile

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/profile` | View profile |
| POST | `/admin/profile` | Update profile |
| POST | `/admin/change-password` | Change password |
| GET | `/admin/downloadProfileImage/{file}` | Download profile image |

### Invoice

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/admin/invoice/download/{id}` | Download invoice PDF |

---

## Response Formats

### Success Response

```json
{
    "success": true,
    "message": "Success message",
    "data": {}
}
```

### Error Response

```json
{
    "success": false,
    "message": "Error message"
}
```

---

## Authentication

Most endpoints require authentication using Laravel Sanctum tokens. Include the token in the Authorization header:

```
Authorization: Bearer {your_token_here}
```

---

## Roles

- `1` - Patient
- `2` - Doctor
- `3` - Admin/Super Admin

---

## Appointment Status

- `1` - Pending
- `2` - Accepted
- `3` - Rejected/Cancelled
- `4` - Completed

---

## Payment Status

- `0` - Not Paid
- `1` - Processing
- `2` - Paid

---

## API Test Results

Base URL: `http://44.203.20.211:8000`

### Admin Login

**Request:**
```bash
curl -X POST http://44.203.20.211:8000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@tahur.com", "password": "Tahur13579"}'
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Admin logged in successfully",
    "data": {
        "id": 1,
        "full_name": "SuperAdmin",
        "email": "admin@tahur.com",
        "role": 0,
        "auth_token": "745|3SVYHOrpDrqOj3j3PDfohnw4Qm0gnXnVP6Vxid9F"
    }
}
```

---

### Public Endpoints (No Authentication Required)

#### 1. Get Home Content
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/public/content/home
```

**Response:**
```json
{
    "success": true,
    "data": {
        "slug": "home",
        "title": "Home Banner",
        "description": "Precise care, Heartfelt touch",
        "description_ar": "نراك بقللب, نهتم بقلك",
        "localeText": "Precise care, Heartfelt touch"
    }
}
```

#### 2. Get Physician Roles
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/PhysicianRoles
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "message": "Records found successfully",
    "data": [
        {"id": 1, "title": "General Practioner", "fee": "SAR 10"},
        {"id": 2, "title": "Specialists", "fee": "SAR 20"},
        {"id": 3, "title": "Consultant", "fee": "SAR 30"},
        {"id": 4, "title": "Elite Doctors", "fee": "SAR 50"}
    ]
}
```

#### 3. Get Banks List
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/banks
```

**Response:**
```json
[
    {"id": 12, "name": "National Commercial Bank (NCB / AlAhli Bank)", "swift_code": "NCBKSAJE"},
    {"id": 13, "name": "Al Rajhi Bank", "swift_code": "RJHISARI"},
    {"id": 14, "name": "Samba Financial Group", "swift_code": "SAMBSARI"},
    {"id": 15, "name": "Riyad Bank", "swift_code": "RIBLSARI"},
    {"id": 16, "name": "Banque Saudi Fransi", "swift_code": "BSFRSARI"},
    {"id": 17, "name": "Saudi British Bank (SABB)", "swift_code": "SABBSARI"},
    {"id": 18, "name": "Arab National Bank (ANB)", "swift_code": "ARNBSARI"},
    {"id": 19, "name": "Alinma Bank", "swift_code": "INMASARI"},
    {"id": 20, "name": "Bank Aljazira", "swift_code": "BJAZSAJE"},
    {"id": 21, "name": "Gulf International Bank Saudi Arabia (GIB-SA)", "swift_code": "GULFSARI"},
    {"id": 22, "name": "Saudi Investment Bank (SAIB)", "swift_code": "SIBCSARI"}
]
```

#### 4. Get Specializations
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/Sepecialisations
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 4, "title": "Family Medicine Physician", "title_ar": "طبيب أسرة"},
        {"id": 9, "title": "General Physician", "title_ar": "طبيب عام"},
        {"id": 12, "title": "Elite doctors", "title_ar": "نخبة الأطباء"},
        {"id": 13, "title": "Internal Medicine", "title_ar": "طب الباطنة"}
    ]
}
```

#### 5. Get Languages
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/languages
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 1, "name": "Arabic", "name_ar": "العربية"},
        {"id": 3, "name": "English", "name_ar": "الإنجليزية"}
    ]
}
```

#### 6. Get Cancel Reasons
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/GetReasons
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 1, "title": "Feeling better, no longer need the appointment"},
        {"id": 2, "title": "Unable to get time off work"},
        {"id": 3, "title": "Emergency / urgent matter came up"},
        {"id": 4, "title": "Booked by mistake"},
        {"id": 5, "title": "Other"}
    ]
}
```

#### 7. Get Report Reasons
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/ReportGetReasons
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 1, "title": "Inappropriate behavior"},
        {"id": 2, "title": "Harassment or abuse"},
        {"id": 3, "title": "No-show / missed appointment"},
        {"id": 4, "title": "Fake or misleading information"},
        {"id": 5, "title": "Unprofessional conduct"},
        {"id": 6, "title": "Payment / billing issue"},
        {"id": 7, "title": "Spam or irrelevant content"},
        {"id": 8, "title": "Violation of terms & conditions"},
        {"id": 9, "title": "Low quality of service / care"},
        {"id": 10, "title": "Other"}
    ]
}
```

#### 8. Get Health Record Types
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/HealthRecords
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 1, "title": "Exsiting medical Medications"},
        {"id": 2, "title": "Cuurent Medications"},
        {"id": 3, "title": "Current Stress level"}
    ]
}
```

#### 9. Get Stress Levels
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/CurrentStressLevels
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 1, "title": "Low Mood", "title_ar": "مزاج منخفض"},
        {"id": 2, "title": "Lost of Interest", "title_ar": "فقدان الاهتمام"},
        {"id": 3, "title": "Excessive Thinking", "title_ar": "تفكير مفرط"},
        {"id": 4, "title": "Difficult to control Excessive Thinking", "title_ar": "صعب التحكم في التفكير المفرط"}
    ]
}
```

#### 10. Get World Countries
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/GetWorldCountries
```

**Response:**
```json
{
    "statusCode": 200,
    "status": "success",
    "data": [
        {"id": 196, "name": "Afghanistan", "iso_code": "AFG", "phone_code": "93"},
        {"id": 197, "name": "Albania", "iso_code": "ALB", "phone_code": "355"},
        {"id": 198, "name": "Algeria", "iso_code": "DZA", "phone_code": "213"},
        {"id": 199, "name": "Andorra", "iso_code": "AND", "phone_code": "376"},
        ...
    ]
}
```

#### 11. API Test Connection
**Request:**
```bash
curl -X GET http://44.203.20.211:8000/api/v1/user/test
```

**Response:**
```json
{
    "success": true,
    "message": "API connected successfully!"
}
```

---

### Known Issues

1. **Admin Routes (Web Routes)**: The admin panel endpoints at `/api/v1/admin/*` require the `App\Http\Controllers\Api\Admin\*` namespace but these controllers are located in `App\Http\Controllers\Admin\`. This is a route configuration issue that needs to be fixed in `routes/api.php`.

2. **Authenticated Routes**: Some authenticated endpoints require the 'login' route to be defined for the redirect middleware. This may cause issues when using token authentication.

---

### Authentication Tokens

The API uses Laravel Sanctum for authentication. Include the token in the Authorization header:

```
Authorization: Bearer {your_token_here}
```

Admin tokens are returned in the `auth_token` field upon successful login.