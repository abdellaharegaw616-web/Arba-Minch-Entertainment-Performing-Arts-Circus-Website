# AMEPAC Administrator Account Provisioning Guide

## Overview
To prevent unauthorized access and privilege escalation, **public user registration is permanently disabled** for administrative accounts. Administrators must be provisioned through explicit backend operations using one of the two documented methods below.

---

## Method 1: Initial Provisioning via Supabase SQL Editor (Recommended)

When deploying to a new Supabase environment, run the SQL script located at `supabase/provision_initial_admin.sql` in the Supabase SQL Editor:

```sql
-- 1. Create the user in auth.users (if using Supabase Auth CLI or extensions)
-- Or create the user via Supabase Dashboard -> Authentication -> Users -> 'Add User' (Email + Password)

-- 2. Link the created auth user into public.admin_profiles as super_admin:
insert into public.admin_profiles (
    id,
    email,
    role,
    full_name,
    is_active
)
select 
    id,
    email,
    'super_admin',
    'AMEPAC Primary Administrator',
    true
from auth.users
where email = 'Arbaminch.circus@gmail.com'
on conflict (id) do update set
    role = 'super_admin',
    is_active = true,
    updated_at = timezone('utc'::text, now());
```

---

## Method 2: Provisioning via Supabase Dashboard

1. Navigate to your Supabase Project: **Authentication &rarr; Users**.
2. Click **Add User** &rarr; **Create User**.
3. Enter the official email: `Arbaminch.circus@gmail.com` and generate a high-entropy passphrase (minimum 12 characters).
4. Verify the user is created and copy their `User UID`.
5. Open **SQL Editor** and run:
   ```sql
   insert into public.admin_profiles (id, email, role, full_name, is_active)
   values ('<COPIED_USER_UID>', 'Arbaminch.circus@gmail.com', 'super_admin', 'AMEPAC Director', true);
   ```

---

## Role Definitions & Privileges

| Role | Permissions |
| :--- | :--- |
| `super_admin` | Full read/write access across all content, booking records, inquiry logs, site settings, and the ability to manage other administrator accounts. |
| `editor` | Full read/write access to troupes, services, events, gallery media, impact stories, and testimonials. Can review bookings and update inquiry statuses. |
| `moderator` | Read-only access to bookings and inquiries; can moderate testimonial approvals and event details. Cannot delete records. |

---

## Security Safeguards

- **Row Level Security (RLS):** All `admin_profiles` mutations require `is_super_admin()`. Regular authenticated users cannot alter their own role or promote themselves.
- **Generic Authentication Responses:** Failed login attempts return `"Invalid email or password. Please verify your credentials and try again."` to eliminate email enumeration attacks.
- **Open Redirect Protection:** All `returnTo` parameters are validated on the server to ensure they strictly begin with `/admin` with no external protocols.
- **Zero Client-Side Role Reliance:** Every sensitive server action checks `verifyAdminAction()` on the server before modifying database state.
