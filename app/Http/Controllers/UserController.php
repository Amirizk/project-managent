<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class UserController extends BaseController
{

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {

        $query = "SELECT  users.id, name, email , role, organization_id
                FROM users
                INNER JOIN roles r on users.id = r.user_id
                WHERE role = 'moderator' or role = 'basic'
                ORDER BY user_id";
        $users = DB::Select($query);


        if(is_null($users)){
            return $this->sendError("Couldn't find organization employees",['error' => 'No employees found']);
        }

        return $this->sendResponse($users, 'Users retrieved successfully.');

    }


    // create a new user (company has admin role creates new employee)
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $pass=bcrypt($input['password']);
        $input['password'] = $pass;
        $user = new User($input);
        $user->save();
        $user_id= $user->id;
        $role = $input['role'];
        $org_id = auth()->user()->id;

        // note we added org_id
        $createRole = [ 'user_id' =>$user_id,
                        'role' => $role,
                        'organization_id' => $org_id,
                        ];
        $role = new Role($createRole);
        $role->save();

        if ($role) {
            $this->scope = $role->role;
        }// try remove
        return $this->sendResponse(new UserResource($user), 'User created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param $user_id
     * @return JsonResponse
     */
    public function show($user_id)
    {
        $user = User::find($user_id);

        if(is_null($user)){
            return $this->sendError('User was not found');
        }

        return $this->sendResponse(new UserResource($user),"User retrieved Successfully");


        //if($user) {
        //    return response()->json($user);
        //}

        //return response()->json(['message' => 'User not found!'], 404);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $user_id
     * @return JsonResponse
     */
    public function update(Request $request, $user_id)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user_id= User::find($user_id);
        $user = User::find($user_id);
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->password= $input['password'];
        $user->save();
        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy($user_id)
    {
        $user=auth()->user()->find($user_id);
        //dd($user2);
        //$user= User::find($user_id);
        $user->delete();
        return $this->sendResponse([new UserResource($user)], 'User deleted successfully.');

    }

}
