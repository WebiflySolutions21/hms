<?php

namespace App\Http\Controllers;

use App\Helpers\Form\FormHelper;
use App\Helpers\ResponseHelper;
use App\Helpers\SuperAdmin\SuperAdminHelper;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    public function get_form_list_for_hospital()
    {

        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:hospitals,id',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        try {
            $formList = new SuperAdminHelper()->get_form_list_by_hospital_id($this->validatedData['id']);
        } catch (\Exception $e) {
            return ResponseHelper::errorResponse($e->getMessage());
        }

        return ResponseHelper::successResponse([
            'forms' => $formList,
        ]);


    }
}
