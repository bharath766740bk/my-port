$(document).ready(function () {

    /* ===== HEADER SCROLL ===== */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#mainHeader').addClass('scrolled');
        } else {
            $('#mainHeader').removeClass('scrolled');
        }
    });

    /* ===== HAMBURGER MENU ===== */
    $('#hamburger').on('click', function () {
        $(this).toggleClass('open');
        $('#mobileMenu').toggleClass('open');
    });

    $('#mobileMenu a').on('click', function () {
        $('#hamburger').removeClass('open');
        $('#mobileMenu').removeClass('open');
    });

    /* ===== ACTIVE NAV LINK ===== */
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 80;
        $('section').each(function () {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            if (scrollPos >= top && scrollPos <= bottom) {
                $('.navbar a, .mobile-menu a').removeClass('active');
                $('.navbar a[href="#' + id + '"], .mobile-menu a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    /* ===== SCROLL REVEAL ===== */
    function revealOnScroll() {
        $('.reveal').each(function () {
            var top = $(this).offset().top;
            var winH = $(window).height();
            if (top < winH - 80) {
                $(this).addClass('visible');
            }
        });
    }
    revealOnScroll();
    $(window).on('scroll', revealOnScroll);

    /* ===== DOWNLOAD CV BUTTON ===== */
    $('#downloadCVBtn').on('click', function () {
        var link = document.createElement('a');
        link.href = 'asset/img/Bharath_CV.pdf';
        link.download = 'Bharath_S_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        var $toast = $('#cv-toast');
        $toast.addClass('show');
        setTimeout(function () {
            $toast.removeClass('show');
        }, 3500);
    });

    /* ===== CONTACT FORM ===== */
    $('#sendBtn').on('click', function () {
        var name     = $('#cf-name').val().trim();
        var email    = $('#cf-email').val().trim();
        var subject  = $('#cf-subject').val().trim();
        var msg      = $('#cf-msg').val().trim();
        var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        $('#formNotif').removeClass('show success error');

        if (!name || !email || !subject || !msg) {
            showNotif('error', 'bi-exclamation-circle', 'Please fill in all fields before sending.');
            return;
        }
        if (!emailReg.test(email)) {
            showNotif('error', 'bi-exclamation-circle', 'Please enter a valid email address.');
            return;
        }

        var $btn = $(this);
        $btn.html('<i class="bi bi-hourglass-split"></i> Sending...').prop('disabled', true);

        setTimeout(function () {
            showNotif('success', 'bi-check-circle', "Message sent successfully! I'll get back to you soon. 🎉");
            $btn.html('<i class="bi bi-send"></i> Send Message').prop('disabled', false);
            $('#cf-name, #cf-email, #cf-subject, #cf-msg').val('');
        }, 1800);
    });

    function showNotif(type, icon, text) {
        var $notif = $('#formNotif');
        $notif.removeClass('show success error');
        $('#notifIcon').attr('class', 'bi ' + icon);
        $('#notifText').text(text);
        $notif.addClass('show ' + type);
        setTimeout(function () {
            $notif.removeClass('show');
        }, 6000);
    }

    $('#notifClose').on('click', function () {
        $('#formNotif').removeClass('show success error');
    });

    /* ===== SMOOTH SCROLL ===== */
    $('a[href^="#"]').on('click', function (e) {
        var target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 70 }, 600, 'swing');
        }
    });

});