<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
});
//sssssssssssssssssssssssssss
