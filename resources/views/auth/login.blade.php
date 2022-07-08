@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card">
                <div class="d-flex justify-content-center">
                    <div class="brand_logo_container">
                        <img src="logo.png" class="brand_logo" alt="Logo">
                    </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="email" class="form-control input_user @error('email') is-invalid @enderror"
                                name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                                placeholder="{{ __('E-Mail Address') }}">
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="input-group mb-2">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control input_pass @error('password') is-invalid @enderror"
                                name="password" required autocomplete="current-password"
                                placeholder="{{ __('Password') }}">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>


                        <div class="d-flex justify-content-center mt-3 login_container">
                            <button type="submit" name="button" class="btn login_btn"> {{ __('Login') }}</button>
                        </div>

                    </form>
                </div>

                <div class="mt-4">
                    <div class="d-flex justify-content-center links">
                        {{ __('Register') }} <a href="#" class="ml-2">Aqui</a>
                    </div>
                    @if (Route::has('password.request'))
                        <div class="d-flex justify-content-center links">
                            <a href="{{ route('password.request') }}">{{ __('Forgot Your Password?') }}</a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
