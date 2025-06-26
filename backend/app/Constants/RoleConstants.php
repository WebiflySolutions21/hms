<?php

namespace App\Constants;

class RoleConstants
{
    public const string TESTER = 'tester';

    public const string SUPER_ADMIN = 'super-admin';

    public const string ADMIN = 'admin';

    public const string DOCTOR = 'doctor';

    public const string STAFF = 'staff';

    public const string RECEPTIONIST = 'receptionist';

    public const string LAB_TECHNICIAN = 'lab-technician';

    public const string PHARMACIST = 'pharmacist';

    public const array ROLES = [
        self::TESTER,
        self::SUPER_ADMIN,
        self::ADMIN,
        self::DOCTOR,
        self::STAFF,
        self::RECEPTIONIST,
        self::LAB_TECHNICIAN,
        self::PHARMACIST,
    ];
}
