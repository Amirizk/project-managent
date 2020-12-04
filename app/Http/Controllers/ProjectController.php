<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Validator;

class ProjectController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $org_id = auth()->user()->id;
        $projects = Project::where('organization_id', $org_id)->get();
        if (is_null($projects)) {
            return $this->sendError("Couldn't find projects", ['error' => 'No projects found']);
        }
        return $this->sendResponse($projects, 'Projects retrieved successfully.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'team_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $org_id = auth()->user()->id;
        $createProject = ['name' => $input['name'],
            'team_id' => $input['team_id'],
            'organization_id' => $org_id,
            'percentage_done' => 0
        ];
        $project = new Project($createProject);
        $project->save();

        return $this->sendResponse($project, 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Project $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Project $project
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($project_id)
    {
        $project = Project::find($project_id);
        $project->delete();
        return $this->sendResponse($project, 'Project deleted successfully.');
    }


}
