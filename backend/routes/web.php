<?php

use Illuminate\Support\Facades\Route;

Route::get(
    '/',
    function () {
        (new \App\Services\EmailService)->addTo('test')->addBcc('tesadfasdoif')->setSubject('Hello This is refactored Email Service')->sendEmailWithTemplate(
            'test',
            [
                'name' => 'Himanshu Sangwan',
                'message' => 'This is a test email from EmailService.',
            ],
        );
    },
);
