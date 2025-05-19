<?php
namespace App\Constants;
class RoleConstants{
    public const string TESTER = 'tester';
    public const string SUPER_ADMIN = 'super-admin';
    public const string ADMIN = 'admin';

    public const array ROLES = [
        self::TESTER,
        self::SUPER_ADMIN,
        self::ADMIN,
    ];
}
