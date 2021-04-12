<?php

namespace App\Http\Controllers;

use DB;
use App\Http\Controllers\CommonController;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    use CommonController;

    // Show app settings page
    public function show()
    {
        $data['oc_settings'] = $this->getAppSetting();

        $settings_data = [
            'form_data' => isset($data) ? $data : [],
            'form_title' => 'Settings',
            'title' => 'Settings',
            'icon' => 'fas fa-cogs',
            'file' => 'admin.layouts.origin.settings',
            'module' => 'Settings',
            'slug' => 'settings',
            'module_type' => 'Single',
            'table_name' => 'oc_settings',
            'permissions' => ['update' => true]
        ];

        return view('admin.templates.form_view', $settings_data);
    }

    // Save app settings
    public function save(Request $request)
    {
        $settings_data = $request->all();
        unset($settings_data["_token"]);

        foreach ($settings_data as $setting => $value) {
            $result = DB::table('oc_settings')
                ->where('field_name', $setting)
                ->where('owner', auth()->user()->username)
                ->update([
                    'field_value' => $value, 
                    'updated_at' => date('Y-m-d H:i:s'), 
                    'last_updated_by' => auth()->user()->username
                ]);

            if ($result) {
                session()->flash('success', true);
            }
        }

        $this->putAppSettingsInSession();

        $data = [
            'success' => true,
            'msg' => __('App settings successfully saved')
        ];

        if ($request->ajax()) {
            return response()->json($data, 200);
        } else {
            return redirect()->route('show.app.settings')->with($data);
        }
    }

    public function changeTheme(Request $request)
    {
        $data = [
            'success' => false,
            'msg' => __('Please provide valid Theme i.e. "light" or "dark"')
        ];

        if ($request->filled('theme')) {
            $theme = trim($request->get('theme'));

            if (in_array($theme, ['light', 'dark'])) {
                $updated = DB::table('oc_settings')
                    ->where('field_name', 'theme')
                    ->where('owner', auth()->user()->username)
                    ->update([
                        'field_value' => $theme, 
                        'updated_at' => date('Y-m-d H:i:s'), 
                        'last_updated_by' => auth()->user()->username
                    ]);

                if ($updated) {
                    $this->putAppSettingsInSession();

                    $data = [
                        'success' => true,
                        'msg' => __('Theme changed successfully')
                    ];
                } else {
                    $data['msg'] = __('Some error occured. Please try again');
                }
            }
        }

        return response()->json($data, 200);
    }
}
