<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'service' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:3000'],
        ], [
            'name.required' => 'Cuéntanos tu nombre.',
            'email.required' => 'Necesitamos un correo para responderte.',
            'email.email' => 'Escribe un correo válido.',
            'message.required' => 'Describe brevemente tu proyecto o consulta.',
        ]);

        ContactMessage::create($validated);

        return redirect(route('home').'#contacto')
            ->with('contact_success', '¡Gracias! Tu mensaje llegó correctamente. Te contactaremos muy pronto.');
    }
}
