<?php

namespace App\Constants;

class RolePermissionConstants
{

    public const array RolesPermissions = [
        RoleConstants::SUPER_ADMIN => [
            PermissionConstants::GET_USERNAME_LIST,
            PermissionConstants::MANAGE_ADMINS,
            PermissionConstants::MANAGE_FORMS,
            PermissionConstants::MANAGE_HOSPITALS,
        ],
        RoleConstants::ADMIN => [
            PermissionConstants::GET_USERNAME_LIST,
            PermissionConstants::ASSIGN_ROLE_TO_USER,
            PermissionConstants::SET_HOSPITAL_CONFIG
        ]
    ];
}
