<?php

namespace App\Helpers\SuperAdmin;

use App\Constants\RoleConstants;
use App\Helpers\BaseHelper;
use App\Models\Admin;
use App\Models\Form;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class SuperAdminHelper extends BaseHelper
{
    public function getFormListByHospitalId($hospital_id): Collection
    {
        return Form::query()
            ->select(
                'forms.id',
                'forms.name',
                'forms.json',
                'hospital_form_details.visibility',
                DB::raw('COALESCE(hospital_form_details.status, "inactive") as status')
            )
            ->leftJoin('hospitals_forms_details as hospital_form_details', function ($join) use ($hospital_id) {
                $join->on('forms.id', '=', 'hospital_form_details.form_id')
                    ->where('hospital_form_details.hospital_id', $hospital_id);
            })
            ->where('forms.is_deleted', 0)
            ->get()
            ->map(function ($record) {
                $record->visibility = json_decode($record->visibility, true);
                return $record;
            });
    }

    public function createAdmin(array $data): void
    {
        $user = User::where('username', $data['username'])->first();
        $admin = new Admin();
        $admin->user_id = $user->id;
        $admin->hospital_id = $data['hospital_id'];
        $admin->details = $data['details'] ?? null;
        $admin->save();

        $role = Role::where('name', RoleConstants::ADMIN)->first();
        $user->assignRole($role);

    }

    public function getUsernameList(string $match)
    {
        return User::where('username', 'like', "%$match%")->limit(10)->pluck('username');
    }
}
