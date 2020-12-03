<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:api', 'role'])->group(function() {

    Route::get('/user/{user_id}/detail', [UserController::class, 'show']);
    // List users
    Route::middleware(['scope:admin,moderator,basic'])->get('/users', [UserController::class, 'index']);

    // Add/Edit User
    Route::middleware(['scope:admin,moderator'])->post('/user', [UserController::class, 'store']);
    Route::middleware(['scope:admin,moderator'])->put('/user/{user_id}', [UserController::class, 'update']);

    // Delete User
    Route::middleware(['scope:admin'])->delete('/user/{user_id}',[ UserController::class, 'destroy']);
    Route::middleware(['scope:admin'])->get('/getAllMembers',[ UserController::class, 'index']);
    Route::middleware(['scope:admin'])->get('/getAllModerators',[ UserController::class, 'getAllModerators']);
    Route::middleware(['scope:admin'])->get('/getAllBasic',[ UserController::class, 'getAllBasic']);



    //add team
    Route::middleware(['scope:admin'])->post('/team',[ TeamController::class, 'store']);


    //add+get+delete projects
    Route::middleware(['scope:admin'])->post('/project',[ ProjectController::class, 'store']);
    Route::middleware(['scope:admin'])->get('/getAllProjects',[ ProjectController::class, 'index']);
    Route::middleware(['scope:admin'])->delete('/project/{project_id}',[ ProjectController::class, 'destroy']);

    //add+get+delete tasks
    Route::middleware(['scope:admin'])->post('/task',[ TaskController::class, 'store']);
    Route::middleware(['scope:admin'])->get('/getAllTask/{project_id}',[ TaskController::class, 'index']);
    Route::middleware(['scope:admin'])->delete('/task/{task_id}',[ TaskController::class, 'destroy']);

});
