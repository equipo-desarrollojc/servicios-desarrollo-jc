@php
    $waNumber = preg_replace('/\D/', '', config('contact.whatsapp_number'));
    $waMessage = rawurlencode('Hola JC, quiero información sobre un proyecto web.');
@endphp

<a
    href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}"
    target="_blank"
    rel="noopener"
    class="whatsapp-float"
    aria-label="Escribir por WhatsApp"
>
    <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
    <span class="whatsapp-float__ping" aria-hidden="true"></span>
</a>
