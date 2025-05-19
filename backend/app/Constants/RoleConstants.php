<?php
namespace App\Constants;
class RoleConstants{
    public const string TESTER = 'tester';
    public const string SUPER_ADMIN = 'super-admin';
    public const string ADMIN = 'admin';
    public const string DOCTOR = 'doctor';
    public const string STAFF = 'staff';
    public const string RECEPTION = 'reception';
    public const string LAB = 'lab';
    public const string PHARMACY = 'pharmacy';

    public const array ROLES = [
        self::TESTER,
        self::SUPER_ADMIN,
        self::ADMIN,
        self::DOCTOR,
        self::STAFF,
        self::RECEPTION,
        self::LAB,
        self::PHARMACY,
    ];
}
