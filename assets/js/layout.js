if(flash.success && flash.success.length > 0){
    new Noty({
        text: flash.success,
        type: 'success',
        animation: {
            open: 'animated bounceInRight', // Animate.css class names
            close: 'animated bounceOutRight' // Animate.css class names
        },
        timeout: 1500
    }).show();
}