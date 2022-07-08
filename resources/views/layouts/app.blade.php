<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <script src="https://kit.fontawesome.com/1a288b19b7.js" crossorigin="anonymous"></script>
    @php
        $route = Route::currentRouteName();
        // dd($route);
    @endphp
    @if ($route == 'login' || $route == 'register')
        <!-- Styles -->
        <link href="{{ asset('css/login.css') }}" rel="stylesheet">
    @else
        <!--     Fonts and icons     -->
        <link rel="stylesheet" type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
        <!-- Nucleo Icons -->
        <link href={{ asset("assets/css/nucleo-icons.css")}} rel="stylesheet" />
        <link href={{asset("assets/css/nucleo-svg.css")}} rel="stylesheet" />
        <!-- Font Awesome Icons -->
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
        <!-- Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
        <!-- CSS Files -->
        <link id="pagestyle" href={{asset("assets/css/material-dashboard.css?v=3.0.2")}} rel="stylesheet" />
    @endif


    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body class="g-sidenav-show  bg-gray-200">

    <div id="app">

        {{-- @include('layouts.navbar') --}}
        @yield('content')
    </div>
</body>

</html>
