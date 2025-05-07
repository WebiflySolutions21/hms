<?php

namespace App\Http\Controllers;

use App\Helpers\Form\FormHelper;
use App\Helpers\ResponseHelper;

class FormController extends Controller
{
    public function create()
    {
        $isInvalidRequest = $this->validateRequest([
            'name' => 'required|unique:forms|min:3',
            'json' => 'required|json',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        new FormHelper()->create_new_form($this->validatedData);
        return ResponseHelper::successResponse(
            ['message' => 'Form created successfully!']
        );
    }

    public function update()
    {
        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:forms,id',
            'name' => 'required|min:3',
            'json' => 'required|json',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $formHelper = new FormHelper();
        $formHelper->update_form($this->validatedData);
        if ($formHelper->hasErrors()) {
            return ResponseHelper::errorResponse($formHelper->getFirstError());
        }
        return ResponseHelper::successResponse(
            ['message' => 'Form updated successfully!']
        );

    }

    public function delete()
    {
        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:forms,id',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        new FormHelper()->delete_form($this->validatedData['id']);
        return ResponseHelper::successResponse(
            ['message' => 'Form deleted successfully!']
        );

    }
//    public function update_status()
//    {
//        $isInvalidRequest = $this->validateRequest([
//            'id' => 'required|exists:forms,id',
//            'status' => 'required|in:active,inactive'
//            'hosi'
//        ]);
//    }
}
