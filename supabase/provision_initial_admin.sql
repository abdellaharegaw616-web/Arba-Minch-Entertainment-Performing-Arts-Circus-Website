-- =====================================================================
-- AMEPAC Initial Super Administrator Provisioning Script
-- Run this script in the Supabase SQL Editor after inviting/creating
-- the user in the Supabase Auth Dashboard.
-- =====================================================================

do $$
declare
    target_email text := 'Arbaminch.circus@gmail.com';
    target_user_id uuid;
begin
    -- Look up user ID from auth.users
    select id into target_user_id
    from auth.users
    where email = target_email;

    if target_user_id is not null then
        insert into public.admin_profiles (
            id,
            email,
            role,
            full_name,
            is_active
        ) values (
            target_user_id,
            target_email,
            'super_admin',
            'AMEPAC Executive Director',
            true
        )
        on conflict (id) do update set
            role = 'super_admin',
            is_active = true,
            updated_at = timezone('utc'::text, now());
        
        raise notice 'Successfully provisioned super_admin profile for % (ID: %)', target_email, target_user_id;
    else
        raise warning 'User with email % was not found in auth.users. Please create the user first via Dashboard -> Authentication -> Users.', target_email;
    end if;
end $$;
