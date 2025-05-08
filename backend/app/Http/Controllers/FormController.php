<?php

namespace App\Http\Controllers;

use App\Helpers\Form\FormHelper;
use App\Helpers\ResponseHelper;
use App\Models\Form;

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

    public function update_status()
    {
        $isInvalidRequest = $this->validateRequest([
            'form_id' => 'required|exists:forms,id',
            'status' => 'required|in:active,inactive',
            'hospital_id' => 'required|exists:hospitals,id',
            'visibility' => 'array|in:doctor,staff,reception,opthal,lab,medical',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        new FormHelper()->update_form_status_for_hospital($this->validatedData);
        return ResponseHelper::successResponse(
            ['message' => 'Form status updated successfully!']
        );
    }
}
