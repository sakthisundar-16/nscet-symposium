<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
$csrf_token = generate_csrf_token();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SYNTAX 2K26 - National Level Technical Symposium organized by Faculty of Computing, NSCET.">
    <meta name="robots" content="index, follow">

    <!-- OpenGraph SEO -->
    <meta property="og:title" content="SYNTAX 2K26 - National Level Technical Symposium">
    <meta property="og:description" content="Code. Create. Connect. Conquer. Join us at NSCET for the ultimate tech showdown.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo SITE_URL; ?>">
    <meta property="og:image" content="<?php echo SITE_URL; ?>/assets/images/event-logo.svg">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SYNTAX 2K26 - National Level Technical Symposium">
    <meta name="twitter:description" content="Code. Create. Connect. Conquer. Join us at NSCET for the ultimate tech showdown.">
    <meta name="twitter:image" content="<?php echo SITE_URL; ?>/assets/images/event-logo.svg">

    <title><?php echo APP_NAME; ?> - National Level Technical Symposium</title>

    <!-- Tailwind CSS (CDN for zero-build setup) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary:    '#3B82F6',
                        'primary-light': '#60A5FA',
                        'primary-dark': '#2563EB',
                        sky:        '#0ea5e9',
                        'sky-light': '#38BDF8',
                        accent:     '#6366F1',
                        'accent-light': '#818CF8',
                        secondary:  '#FFFFFF',
                        background: '#F0F7FF'
                    },
                    fontFamily: {
                        poppins: ['Poppins', 'sans-serif'],
                        inter: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-background text-gray-900 font-inter antialiased overflow-x-hidden selection:bg-primary selection:text-white">
