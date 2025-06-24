<?php

namespace App\Http\Controllers;

use App\Helpers\Hospital\HospitalHelper;
use App\Helpers\ResponseHelper;

class HospitalController extends Controller
{
    public function createHospital()
    {
        $IsInvalidRequest = $this->validateRequest([
            'name' => 'required|min:3',
            'address' => 'required|min:3',
            'mobile' => 'required|min:10',
            'registration_no' => 'required|unique:hospitals|min:3|regex:/^[a-zA-Z0-9]+$/',
        ]);
        if ($IsInvalidRequest) {
            return $IsInvalidRequest;
        }
        $hospitalHelper = new HospitalHelper;
        $hospitalHelper->createNewHospital($this->validatedData);

        return ResponseHelper::successResponse(
            ['message' => 'Hospital created successfully!']
        );

    }

    public function getAllHospitals()
    {
        return (new HospitalHelper)->getHospitalList();
    }

    public function updateHospital()
    {
        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:hospitals,id',
            'name' => 'required|min:3',
            'address' => 'required|min:3',
            'mobile' => 'required|min:10',
            'registration_no' => 'required|min:3|regex:/^[a-zA-Z0-9]+$/',
            'status' => 'required|in:active,revoked',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $hospitalHelper = new HospitalHelper;
        $hospitalHelper->updateHospital($this->validatedData);
        if ($hospitalHelper->hasErrors()) {
            return ResponseHelper::errorResponse($hospitalHelper->getErrorMessage());
        }

        return ResponseHelper::successResponse(
            ['message' => 'Hospital updated successfully!']
        );

    }
}
