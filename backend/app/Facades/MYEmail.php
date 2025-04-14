<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class MYEmail extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'myemail';
    }
}
