<?php

namespace App\Helpers\Hospital;

use App\Helpers\BaseHelper;
use App\Models\Hospital;

class HospitalHelper extends BaseHelper
{

    public function create_new_hospital(array $data): void
    {
        Hospital::create([
            'name' => $data['name'],
            'address' => $data['address'],
            'mobile' => $data['mobile'],
            'registration_no' => $data['registration_no'],
            'registration_date' => new \DateTime(),
        ]);
    }

    public function get_hospital_list()
    {
        return Hospital::select(['status', 'registration_no', 'name', 'mobile', 'address', 'registration_date'])->get();
    }

    public function update_hospital(array $data): void
    {
        try {
            $hospital = Hospital::find($data['id']);
            $hospital->update($data);
            $hospital->save();
        }
        catch (\Exception $e) {
            $this->addError('Hospital Registration No. already exists.');
        }

    }
}
