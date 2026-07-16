<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'landing')->name('home');

Route::post('/contacto', [ContactController::class, 'store'])->name('contact.store');
