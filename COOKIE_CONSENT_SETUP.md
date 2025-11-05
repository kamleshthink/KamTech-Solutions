# Cookie Consent & Legal Compliance System

This document provides an overview of the cookie consent and legal compliance system implemented in the Kamlesh Portfolio project.

## Overview

The system includes:
- **Cookie Consent Banner** - GDPR/CCPA compliant cookie consent management
- **Terms of Service** - Legal terms and conditions
- **Cookie Policy** - Detailed cookie usage information
- **Backend API** - MongoDB storage for consent tracking

---

## Files Created

### Frontend Components

1. **`kamlesh-portfolio/src/components/CookieConsent.tsx`**
   - Modern cookie consent banner
   - Accept All, Reject All, and Customize options
   - Stores preferences in localStorage and MongoDB
   - Auto-shows after 1 second delay for new users
   - Generates unique user ID for tracking

2. **`kamlesh-portfolio/src/components/TermsOfService.tsx`**
   - Comprehensive terms of service modal
   - Sections: Agreement, Services, User Responsibilities, IP, Payments, Liability, etc.
   - PragyaTek Solutions company details

3. **`kamlesh-portfolio/src/components/CookiePolicy.tsx`**
   - Detailed cookie policy modal
   - Explains cookie types: Essential, Analytics, Marketing
   - Cookie management instructions for different browsers
   - Third-party cookie opt-out links

### Backend Files

4. **`backend/src/models/CookieConsent.js`**
   - MongoDB schema for cookie consent storage
   - Fields: userId, acceptedCategories, ipAddress, userAgent, timestamp, preferences
   - Indexes for performance
   - Static methods for analytics

5. **`backend/src/controllers/cookieConsentController.js`**
   - CRUD operations for consent management
   - Functions: saveCookieConsent, getUserConsent, getAllConsents, getConsentStats, deleteUserConsent

6. **`backend/src/routes/cookieConsentRoutes.js`**
   - API endpoints for consent management
   - Public and admin routes

---

## API Endpoints

### Public Routes

#### Save Cookie Consent
```http
POST /api/cookie-consent
Content-Type: application/json

{
  "userId": "uuid-here",
  "acceptedCategories": ["essential", "analytics"],
  "timestamp": "2025-11-02T10:30:00Z",
  "userAgent": "Mozilla/5.0...",
  "preferences": {
    "essential": true,
    "analytics": true,
    "marketing": false
  }
}
```

#### Get User Consent
```http
GET /api/cookie-consent/:userId
```

#### Get User Consent History
```http
GET /api/cookie-consent/:userId/history?limit=10
```

#### Delete User Consent (GDPR)
```http
DELETE /api/cookie-consent/:userId
```

### Admin Routes

#### Get All Consents
```http
GET /api/cookie-consent/admin/all?page=1&limit=50
```

#### Get Consent Statistics
```http
GET /api/cookie-consent/admin/stats
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "total": 1250,
    "analyticsAccepted": 850,
    "marketingAccepted": 420,
    "essentialOnly": 400,
    "analyticsPercentage": "68.00",
    "marketingPercentage": "33.60",
    "uniqueUsers": 1100,
    "recentConsents": [...]
  }
}
```

---

## Features

### Cookie Consent Banner

**Key Features:**
- GDPR and CCPA compliant
- 3 interaction modes:
  - **Accept All** - Enables all cookie categories
  - **Reject All** - Only essential cookies
  - **Customize** - Granular control per category
- Automatic user ID generation (UUID v4)
- Stores consent in localStorage and MongoDB
- Remembers user preference
- Links to Privacy Policy and Cookie Policy
- Modern, responsive design

**Cookie Categories:**
1. **Essential** - Always enabled (required for site functionality)
2. **Analytics** - Google Analytics, performance tracking
3. **Marketing** - Advertising, remarketing pixels

### Terms of Service

**Sections Covered:**
1. Agreement to Terms
2. Services Description
3. User Responsibilities
4. Intellectual Property Rights
5. Payment Terms & Refunds
6. Limitation of Liability
7. Termination Clauses
8. Governing Law (India, Dhanbad jurisdiction)
9. Changes to Terms
10. Miscellaneous (Severability, Waiver, Entire Agreement)
11. Contact Information

### Cookie Policy

**Content:**
- What are cookies (session vs persistent)
- Why we use cookies
- Types of cookies with detailed descriptions:
  - Essential (authentication, security)
  - Analytics (Google Analytics)
  - Functionality (preferences)
  - Marketing (advertising pixels)
- Detailed cookie table with names, purposes, types, durations
- Browser-specific cookie management instructions
- Third-party opt-out links
- Do Not Track signal information

---

## Integration

### App.tsx Integration

The components are integrated in `App.tsx`:

```typescript
import CookieConsent from './components/CookieConsent';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';

const App: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

  return (
    <ThemeProvider>
      <div>
        {/* ... other components ... */}
        <Footer
          onTermsClick={() => setIsTermsOpen(true)}
          onCookiePolicyClick={() => setIsCookiePolicyOpen(true)}
        />

        <CookieConsent
          onPrivacyClick={() => setIsCookiePolicyOpen(true)}
          onCookiePolicyClick={() => setIsCookiePolicyOpen(true)}
        />

        <TermsOfService
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />

        <CookiePolicy
          isOpen={isCookiePolicyOpen}
          onClose={() => setIsCookiePolicyOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
};
```

### Footer.tsx Updates

Added legal links to footer:

```typescript
interface FooterProps {
  onTermsClick: () => void;
  onCookiePolicyClick: () => void;
}

// In the footer bottom bar:
<button onClick={onTermsClick}>Terms of Service</button>
<button onClick={onCookiePolicyClick}>Cookie Policy</button>
```

### Backend Integration

Added to `backend/src/server.js`:

```javascript
const cookieConsentRoutes = require('./routes/cookieConsentRoutes');
app.use('/api/cookie-consent', cookieConsentRoutes);
```

---

## Data Storage

### LocalStorage
```javascript
{
  "cookie_consent": {
    "userId": "uuid",
    "acceptedCategories": ["essential", "analytics"],
    "timestamp": "ISO-8601",
    "userAgent": "...",
    "preferences": { ... }
  },
  "cookie_user_id": "uuid",
  "cookie_consent_timestamp": "ISO-8601"
}
```

### MongoDB Schema
```javascript
{
  userId: String (indexed),
  acceptedCategories: [String] (enum: essential, analytics, marketing),
  ipAddress: String,
  userAgent: String,
  timestamp: Date (indexed),
  preferences: {
    essential: Boolean,
    analytics: Boolean,
    marketing: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## Company Details

All legal documents include:

- **Company Name:** PragyaTek Solutions Private Limited
- **Email:** support@pragyateksolutions.com
- **Alternative Email:** kamleshsamudih@gmail.com
- **Phone:** +91 7209213003, +91 8969445367
- **Location:** Sindri, Dhanbad, Jharkhand, India
- **Jurisdiction:** Dhanbad, Jharkhand, India

---

## GDPR Compliance

The system supports GDPR requirements:

1. **Consent Management** - Clear opt-in/opt-out
2. **Right to Access** - GET user consent endpoint
3. **Right to be Forgotten** - DELETE consent endpoint
4. **Consent History** - Full audit trail
5. **Transparent Policies** - Detailed cookie and privacy policies
6. **Granular Control** - Category-level preferences

---

## Security Features

1. **IP Address Tracking** - Fraud detection
2. **User Agent Logging** - Device tracking
3. **Timestamp Recording** - Audit trail
4. **Consent Versioning** - History maintained
5. **Secure Storage** - MongoDB with indexes

---

## Analytics & Reporting

The admin can view:

- Total consents given
- Category acceptance rates (Analytics: 68%, Marketing: 33%)
- Unique users count
- Daily consent trends (last 30 days)
- Consent history per user

---

## Testing

### Manual Testing Checklist

- [ ] Cookie banner appears for new users
- [ ] "Accept All" stores all preferences
- [ ] "Reject All" stores essential only
- [ ] "Customize" saves custom preferences
- [ ] Banner doesn't reappear after consent
- [ ] Terms of Service modal opens/closes
- [ ] Cookie Policy modal opens/closes
- [ ] Footer links work correctly
- [ ] API saves consent to MongoDB
- [ ] Consent retrieval works
- [ ] Admin stats endpoint works

### API Testing with cURL

```bash
# Save consent
curl -X POST http://localhost:5000/api/cookie-consent \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-uuid-123",
    "acceptedCategories": ["essential", "analytics"],
    "preferences": {
      "essential": true,
      "analytics": true,
      "marketing": false
    }
  }'

# Get user consent
curl http://localhost:5000/api/cookie-consent/test-uuid-123

# Get stats
curl http://localhost:5000/api/cookie-consent/admin/stats
```

---

## Environment Variables

No new environment variables required. Uses existing:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Backend port (default: 5000)
- `VITE_API_URL` - Frontend API URL

---

## Future Enhancements

Potential improvements:

1. **Admin Authentication** - Protect admin routes with JWT
2. **Privacy Policy Component** - Dedicated privacy policy modal
3. **Cookie Preference Center** - Persistent settings panel
4. **Consent Expiry** - Auto-expire consents after 1 year
5. **Email Notifications** - Notify admin of new consents
6. **Export Functionality** - Download consent reports as CSV
7. **Multi-language Support** - Translate policies
8. **A/B Testing** - Test different consent UX patterns

---

## Support

For issues or questions:
- Email: support@pragyateksolutions.com
- Phone: +91 7209213003

---

**Last Updated:** November 2, 2025
