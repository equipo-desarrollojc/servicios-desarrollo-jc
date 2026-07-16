@php
    $waNumber = preg_replace('/\D/', '', config('contact.whatsapp_number'));
    $waMessage = rawurlencode('Hola JC, quiero información sobre un proyecto web.');
    $contactEmail = config('contact.email');
@endphp

<section class="contact" id="contacto">
    <div class="container contact__grid">
        <div class="contact__intro" data-reveal>
            <p class="section-kicker">Contacto</p>
            <h2 class="section-title">Hablemos de tu proyecto</h2>
            <p class="section-lede">
                Cuéntanos qué necesitas y te respondemos con los siguientes pasos. Sin compromiso.
            </p>

            <ul class="contact__channels">
                <li>
                    <a href="https://wa.me/{{ $waNumber }}?text={{ $waMessage }}" target="_blank" rel="noopener">
                        <i class="ti ti-brand-whatsapp" aria-hidden="true"></i>
                        WhatsApp directo
                    </a>
                </li>
                <li>
                    <a href="mailto:{{ $contactEmail }}">
                        <i class="ti ti-mail" aria-hidden="true"></i>
                        {{ $contactEmail }}
                    </a>
                </li>
            </ul>
        </div>

        <div class="contact__form-wrap" data-reveal>
            @if (session('contact_success'))
                <div class="alert alert--success" role="status">
                    {{ session('contact_success') }}
                </div>
            @endif

            <form action="{{ route('contact.store') }}" method="POST" class="contact-form" novalidate>
                @csrf

                <div class="field">
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" required>
                    @error('name') <span class="field__error">{{ $message }}</span> @enderror
                </div>

                <div class="field-row">
                    <div class="field">
                        <label for="email">Correo</label>
                        <input type="email" id="email" name="email" value="{{ old('email') }}" required>
                        @error('email') <span class="field__error">{{ $message }}</span> @enderror
                    </div>

                    <div class="field">
                        <label for="phone">Teléfono (opcional)</label>
                        <input type="tel" id="phone" name="phone" value="{{ old('phone') }}">
                        @error('phone') <span class="field__error">{{ $message }}</span> @enderror
                    </div>
                </div>

                <div class="field">
                    <label for="service">Servicio de interés</label>
                    <select id="service" name="service">
                        <option value="" @selected(old('service') === null)>Selecciona una opción</option>
                        <option value="Sitio web / landing page" @selected(old('service') === 'Sitio web / landing page')>Sitio web / landing page</option>
                        <option value="Tienda en línea" @selected(old('service') === 'Tienda en línea')>Tienda en línea</option>
                        <option value="Software a medida" @selected(old('service') === 'Software a medida')>Software a medida</option>
                        <option value="Mantenimiento y soporte" @selected(old('service') === 'Mantenimiento y soporte')>Mantenimiento y soporte</option>
                        <option value="Otro" @selected(old('service') === 'Otro')>Otro</option>
                    </select>
                    @error('service') <span class="field__error">{{ $message }}</span> @enderror
                </div>

                <div class="field">
                    <label for="message">Cuéntanos sobre tu proyecto</label>
                    <textarea id="message" name="message" rows="4" required>{{ old('message') }}</textarea>
                    @error('message') <span class="field__error">{{ $message }}</span> @enderror
                </div>

                <button type="submit" class="btn btn--primary btn--block">
                    Enviar mensaje
                </button>
            </form>
        </div>
    </div>
</section>
