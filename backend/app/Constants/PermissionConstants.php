<?php

namespace App\Constants;
class PermissionConstants
{
    public const string MANAGE_HOSPITALS = 'manage-hospitals';
    public const string MANAGE_FORMS = 'manage-forms';
    public const string MANAGE_ADMINS = 'manage-admins';
    public const string GET_USERNAME_LIST = 'get-username-list';

    public const string ASSIGN_ROLE_TO_USER = 'assign-role-to-user';
    public const string SET_HOSPITAL_CONFIG = 'get-hospital-config';


    public const array PERMISSIONS = [
        self::MANAGE_HOSPITALS,
        self::MANAGE_FORMS,
        self::MANAGE_ADMINS,
        self::GET_USERNAME_LIST,
        self::ASSIGN_ROLE_TO_USER,
        self::SET_HOSPITAL_CONFIG,
    ];
}
