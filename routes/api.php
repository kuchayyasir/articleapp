<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ArticleController;

Route::post('/login', [LoginController::class, 'authenticate']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/articles', [ArticleController::class,'index']);
    Route::get('/articles/{article}', [ArticleController::class,'show']);
    Route::post('/articles', [ArticleController::class,'store']);
    Route::put('/articles/{article}',[ArticleController::class,'update']);
    Route::delete('/articles/{article}',[ArticleController::class,'delete']);
    Route::post('/logout', [LoginController::class, 'logout']);
});
