<?php

namespace App\Helpers\Form;

use App\Helpers\BaseHelper;
use App\Models\Form;

class FormHelper extends BaseHelper
{
    public function create_new_form(array $data): void
    {
        Form::create([
            'name' => $data['name'],
            'json' => $data['json'],
        ]);
    }

    public function update_form(array $data): void
    {
        try {
            $form = Form::find($data['id']);
            $form->update($data);
            $form->save();
        } catch (\Exception $e) {
            $this->addError('Form Name already exists.');
        }
    }

    public function delete_form(int $id): void
    {
        $form = Form::find($id);
        $form->is_deleted = true;
        $form->save();
    }

}

