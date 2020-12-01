<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();


        // Mandatory to define Scope
        Passport::tokensCan([
            'admin' => 'Add/Edit/Delete Users', //Add/Edit/Delete Users we can delete these
            'moderator' => 'Add/Edit Users', //Add/Edit Users  Users we can delete these
            'basic' => 'List Users' //List Users  Users we can delete these
        ]);

        Passport::setDefaultScope([
            'basic'
        ]);

        //
    }
}
