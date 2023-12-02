<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ProductsCategoryController;
use \App\Http\Controllers\ProductsController;

Route::get('/products-category', [ProductsCategoryController::class, 'index']);
Route::post('/products-category', [ProductsCategoryController::class, 'store']);
Route::get('/products-category/{id}', [ProductsCategoryController::class, 'show']);
Route::put('/products-category/{id}', [ProductsCategoryController::class, 'update']);
Route::delete('/products-category/{id}', [ProductsCategoryController::class, 'destroy']);

Route::get('/products', [ProductsController::class, 'index']);
Route::post('/products', [ProductsController::class, 'store']);
Route::get('/products/{id}', [ProductsController::class, 'show']);
Route::put('/products/{id}', [ProductsController::class, 'update']);
Route::delete('/products/{id}', [ProductsController::class, 'destroy']);

