<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends BaseController
{
    //

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        // create a new user(organisation) with the input from registration
        $user = new User($input);
        $user->save();

        $success['name'] =  $user->name;
        $success['user_id'] = $user->id;
        $user_id = $user->id;

        // create a role of admin for the organisation
        $createRole = [ 'user_id' =>$user_id, 'role' => 'admin'];
        $role = new Role($createRole);
        $role->save();

        $success['role']=$role->role;

        return $this->sendResponse($success, 'Organisation registered successfully.');

    }


    public function login(Request $request)
    {

        if(auth()->attempt([  'email' => $request->email,
                            'password' => $request->password]))
        {

            $user = auth()->user();
            $userRole = $user->role()->first();
            //dd($userRole);
            if ($userRole) {
                $this->scope = $userRole->role;
            }
            $success['token'] = $user->createToken($user->email.'-'.now(), [$this->scope])->accessToken;
            $success['name'] =  $user->name;
            $success['id'] = $user->id;
            $success['email'] = $user->email;
            //dd($success);
            return $this->sendResponse($success, 'User logged in successfully.');
        }
        else
        {
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }

    }
}